// import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
// import { context } from "./state";
// import { SLACK, PARAMETER_STORE } from "./config/constants";

// export const lambdaHandler = async (
//   event: APIGatewayProxyEvent
// ): Promise<APIGatewayProxyResult> => {
//   const param = {
//     Name: PARAMETER_STORE.webHook,
//     WithDecryption: true,
//   };
//   const webHookUrl = await context.sdk.aws.ssm.getParameter(param).promise();

//   if (!webHookUrl.Parameter?.Value) {
//     throw new Error("parameter not found");
//   }

//   const res = await context.sdk.slack.notify(webHookUrl.Parameter.Value, {
//     username: SLACK.userName,
//     text: SLACK.text,
//     icon_emoji: SLACK.emoji.fire,
//   });
//   if (!res.ok) {
//     console.error("[slack#notify]failed: ", res);
//   }
//   console.log("[slack#notify]succeeded");

//   return {
//     statusCode: 200,
//     body: `Queries: ${JSON.stringify(event.queryStringParameters)}`,
//   };
// };
