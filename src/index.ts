import AWS from 'aws-sdk';
import fetch, { Response } from 'node-fetch';

const SSM_VERSION = '2014-11-06';
export const SLACK = {
  userName: 'write-code-everyday',
  emoji: {
    fire: ':evergreen_tree:',
  },
  text: 'write code',
} as const;

const initAwsSdk = () => ({
  ssm: new AWS.SSM({ apiVersion: SSM_VERSION }),
});
initAwsSdk();
export const awsSdk = initAwsSdk();

export const initSlackSdk = (): {
  notify: (url: string, payload: { [k: string]: any }) => Promise<Response>;
} => ({
  notify: async (url: string, payload: { [k: string]: any }) =>
    fetch(url, {
      method: 'post',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    }),
});
export const slackSdk = initSlackSdk();

export const handler = async (/* event */): Promise<void> => {
  const param = {
    // todo env
    Name: '/prd/write-code-everyday/slack-webhook-url',
    WithDecryption: true,
  };
  const parameter = await awsSdk.ssm.getParameter(param).promise();

  if (!parameter || !parameter.Parameter?.Value) {
    throw new Error('parameter not found');
  }

  console.log('[ssm#getParamerter', parameter);
  const webHookUrl = parameter.Parameter.Value;

  const res = await slackSdk.notify(webHookUrl, {
    username: SLACK.userName,
    text: SLACK.text,
    icon_emoji: SLACK.emoji.fire,
  });
  if (!res.ok) {
    console.error('[slack#notify]failed: ', res);
  }
  console.log('[slack#notify]succeeded: ', res.body);
};
