import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { randomUUID } from "crypto";

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

export const createCourse = async (event) => {
  try {
    const payload = JSON.parse(event.body || "{}");

    const { title, category, status, progress, description } = payload;

    // Validate required fields
    if (!title || !category || !status || progress === undefined || !description) {
      return createResponse(400, { error: "Missing required fields." });
    }

    // Validate category
    if (!allowedCategories.includes(category)) {
      return createResponse(400, {
        error: `Invalid category. Must be one of: ${allowedCategories.join(", ")}.`,
      });
    }

    //  Validate status
    if (!allowedStatuses.includes(status)) {
      return createResponse(400, {
        error: `Invalid status. Must be one of: ${allowedStatuses.join(", ")}.`,
      });
    }

    // Validate progress (0 - 100)
    const progressNum = Number(progress);
    if (!Number.isFinite(progressNum) || progressNum < 0 || progressNum > 100) {
      return createResponse(400, { error: "progress must be between 0 and 100." });
    }

    //  Keep progress consistent with status
    if (status === COURSE_STATUSES.NOT_STARTED && progressNum !== 0) {
      return createResponse(400, {
        error: 'If status is "Not Started", progress must be 0.',
      });
    }

    if (status === COURSE_STATUSES.COMPLETED && progressNum !== 100) {
      return createResponse(400, {
        error: 'If status is "Completed", progress must be 100.',
      });
    }

    if (status === COURSE_STATUSES.IN_PROGRESS && (progressNum <= 0 || progressNum >= 100)) {
      return createResponse(400, {
        error: 'If status is "In Progress", progress must be between 1 and 99.',
      });
    }

    const courseId = randomUUID();
    const now = new Date().toISOString();

    const imageUrl = CATEGORY_IMAGES[category];

    const item = {
      courseId,
      title,
      category,
      status,
      progress: progressNum,
      description,
      imageUrl,
      createdAt: now,
      updatedAt: now,
    };

    await docClient.send(
      new PutCommand({
        TableName: tableName,
        Item: item,
        ConditionExpression: "attribute_not_exists(courseId)",
      })
    );

    return createResponse(201, { message: "Course created successfully!", item });
  } catch (err) {
    console.error("Create course error:", err);
    return createResponse(500, { error: "Internal Server Error", message: err.message });
  }
};