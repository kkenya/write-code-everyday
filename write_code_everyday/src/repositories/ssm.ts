import { aws } from '../lib/aws';
import { PARAMETER_STORE } from '../config/constants';

export const getWebhookUrl = async (): Promise<string> => {
  const param = {
    Name: PARAMETER_STORE.webHook,
    WithDecryption: true,
  };
  const webHookUrl = await aws.ssm.getParameter(param).promise();

  if (!webHookUrl.Parameter?.Value) {
    throw new Error('parameter not found');
  }
  return webHookUrl.Parameter.Value;
};
