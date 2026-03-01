import { DynamoDBDocumentClient, GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
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


export const getCourses = async (event) => {
    const { pathParameters } = event;
    const { id } = pathParameters || {};

    try {
        let command;

        if (id) {
            command = new GetCommand({
                TableName: tableName,
                Key: {
                    courseId: id,
                },
            });

            const response = await docClient.send(command);

       
            if (!response.Item) {
                return createResponse(404, { error: "Course does not exist!" });
            }

            return createResponse(200, response.Item);
        }
        else {
            command = new ScanCommand({
                TableName: tableName,
            });

            const response = await docClient.send(command);

            return createResponse(200, response.Items || []);
        }

    }
    catch (err) {
        console.error("Error fetching data from DynamoDB:", err);
        return createResponse(500, { error: err.message });
    }
}
