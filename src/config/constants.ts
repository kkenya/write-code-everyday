export const SSM_VERSION = '2014-11-06';

export const SLACK = {
  userName: 'write-code-everyday',
  emoji: {
    fire: ':fire:',
  },
  text: 'Write code',
} as const;

export const PARAMETER_STORE = {
  webHook: '/prd/write-code-everyday/slack-webhook-url',
};
