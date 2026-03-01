import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const tableName = process.env.tableName || "courseTracker";

const createResponse = (statusCode, body) => {
  const responseBody = JSON.stringify(body);
  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: responseBody,
  };
};

export const deleteCourses = async (event) => {
  const courseId = event?.pathParameters?.id; 
  if (!courseId) {
    return createResponse(400, { error: "Missing courseId (path parameter: id)" });
  }

  try {
    const command = new DeleteCommand({
      TableName: tableName,
      Key: { courseId },
      ReturnValues: "ALL_OLD",
      ConditionExpression: "attribute_exists(courseId)",
    });

    const response = await docClient.send(command);

    return createResponse(200, {
      message: "Course deleted successfully!",
      deletedItem: response.Attributes || null,
    });
  } catch (err) {
    if (err.message === "The conditional request failed") {
      return createResponse(404, { error: "Course not found!" });
    }

    return createResponse(500, {
      error: "Internal Server Error!",
      message: err.message,
    });
  }
};
