import { DynamoDBDocumentClient, UpdateCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.tableName || "courseTracker";

const CATEGORY_IMAGES = {
  Tech: "https://course-tracker-assets-eleja.s3.us-east-1.amazonaws.com/static/tech.jpg",
  Business: "https://course-tracker-assets-eleja.s3.us-east-1.amazonaws.com/static/business.jpg",
  Operations: "https://course-tracker-assets-eleja.s3.us-east-1.amazonaws.com/static/operations.jpg",
  General: "https://course-tracker-assets-eleja.s3.us-east-1.amazonaws.com/static/general.jpg",
};

const allowedCategories = Object.keys(CATEGORY_IMAGES);

const COURSE_STATUSES = {
  NOT_STARTED: "Not Started",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
};

const allowedStatuses = Object.values(COURSE_STATUSES);

const createResponse = (statusCode, body) => ({
  statusCode,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

export const updateCourses = async (event) => {
  const courseId = event?.pathParameters?.id;
  if (!courseId) return createResponse(400, { error: "Missing courseId" });

  let payload = {};
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return createResponse(400, { error: "Invalid JSON body" });
  }

  const { title, category, description, progress, status } = payload;

  if (
    title === undefined &&
    category === undefined &&
    description === undefined &&
    progress === undefined &&
    status === undefined
  ) {
    return createResponse(400, { error: "Nothing to update!" });
  }

  // Validate category if provided
  if (category !== undefined && !allowedCategories.includes(category)) {
    return createResponse(400, {
      error: `Invalid category. Must be one of: ${allowedCategories.join(", ")}.`,
    });
  }

  // Validate status if provided
  if (status !== undefined && !allowedStatuses.includes(status)) {
    return createResponse(400, {
      error: `Invalid status. Must be one of: ${allowedStatuses.join(", ")}.`,
    });
  }

  // Validate progress format if provided
  let progressNum;
  if (progress !== undefined) {
    progressNum = Number(progress);
    if (!Number.isFinite(progressNum) || progressNum < 0 || progressNum > 100) {
      return createResponse(400, { error: "progress must be a number between 0 and 100." });
    }
  }

  // ✅ Fetch existing item so we can enforce progress/status consistency
  let existing;
  try {
    const getRes = await docClient.send(
      new GetCommand({
        TableName: tableName,
        Key: { courseId },
      })
    );

    if (!getRes.Item) return createResponse(404, { error: "Course does not exist!" });
    existing = getRes.Item;
  } catch (err) {
    return createResponse(500, { error: "Internal Server Error!", message: err.message });
  }

  const nextStatus = status !== undefined ? status : existing.status;
  const nextProgress = progress !== undefined ? progressNum : Number(existing.progress);

  // ✅ Enforce consistency rules
  if (nextStatus === COURSE_STATUSES.NOT_STARTED && nextProgress !== 0) {
    return createResponse(400, {
      error: 'If status is "Not Started", progress must be 0.',
    });
  }

  if (nextStatus === COURSE_STATUSES.COMPLETED && nextProgress !== 100) {
    return createResponse(400, {
      error: 'If status is "Completed", progress must be 100.',
    });
  }

  if (nextStatus === COURSE_STATUSES.IN_PROGRESS && (nextProgress <= 0 || nextProgress >= 100)) {
    return createResponse(400, {
      error: 'If status is "In Progress", progress must be between 1 and 99.',
    });
  }

  // Build UpdateExpression dynamically
  const setParts = [];
  const ExpressionAttributeNames = {};
  const ExpressionAttributeValues = {};

  if (title !== undefined) {
    ExpressionAttributeNames["#title"] = "title";
    ExpressionAttributeValues[":title"] = title;
    setParts.push("#title = :title");
  }

  if (category !== undefined) {
    ExpressionAttributeValues[":category"] = category;
    setParts.push("category = :category");

    ExpressionAttributeValues[":imageUrl"] = CATEGORY_IMAGES[category];
    setParts.push("imageUrl = :imageUrl");
  }

  if (description !== undefined) {
    ExpressionAttributeValues[":description"] = description;
    setParts.push("description = :description");
  }

  if (progress !== undefined) {
    ExpressionAttributeValues[":progress"] = progressNum;
    setParts.push("progress = :progress");
  }

  if (status !== undefined) {
    ExpressionAttributeValues[":status"] = status;
    setParts.push("status = :status");
  }

  const now = new Date().toISOString();
  ExpressionAttributeValues[":updatedAt"] = now;
  setParts.push("updatedAt = :updatedAt");

  const updateExpression = "SET " + setParts.join(", ");

  try {
    const command = new UpdateCommand({
      TableName: tableName,
      Key: { courseId },
      UpdateExpression: updateExpression,
      ...(Object.keys(ExpressionAttributeNames).length > 0 && { ExpressionAttributeNames }),
      ExpressionAttributeValues,
      ReturnValues: "ALL_NEW",
    });

    const response = await docClient.send(command);

    return createResponse(200, {
      message: "Course updated successfully!",
      item: response.Attributes,
    });
  } catch (err) {
    return createResponse(500, {
      error: "Internal Server Error!",
      message: err.message,
    });
  }
};