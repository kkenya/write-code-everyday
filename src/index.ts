import { sdk } from './lib';
import { SLACK, PARAMETER_STORE } from './config/constants';

export const handler = async (/* event */): Promise<void> => {
  const param = {
    Name: PARAMETER_STORE.webHook,
    WithDecryption: true,
  };
  const webHookUrl = await sdk.aws.ssm.getParameter(param).promise();

  if (!webHookUrl.Parameter?.Value) {
    throw new Error('parameter not found');
  }

  console.log('[ssm#getParamerter', webHookUrl);

  const res = await sdk.slack.notify(webHookUrl.Parameter.Value, {
    username: SLACK.userName,
    text: SLACK.text,
    icon_emoji: SLACK.emoji.fire,
  });
  if (!res.ok) {
    console.error('[slack#notify]failed: ', res);
  }
  console.log('[slack#notify]succeeded');
};
