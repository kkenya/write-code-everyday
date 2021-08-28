import { APIGatewayProxyHandler } from 'aws-lambda';
import { SLACK } from './config/constants';
import { notify } from './repositories/slack';
import { getWebhookUrl } from './repositories/ssm';

export const lambdaHandler: APIGatewayProxyHandler = async (
  event /*context*/
) => {
  const webhookUrl = await getWebhookUrl();
  await notify(webhookUrl, {
    username: SLACK.userName,
    text: SLACK.text,
    icon_emoji: SLACK.emoji.fire,
  });

  return {
    statusCode: 200,
    body: `Queries: ${JSON.stringify(event.queryStringParameters)}`,
  };
};
