import fetch, { Response } from 'node-fetch';

type slackSdk = {
  notify: (
    url: string,
    payload: {
      username: string;
      text: string;
      icon_emoji: string;
    }
  ) => Promise<Response>;
};

export const init = (): slackSdk => ({
  notify: async (url, payload) =>
    fetch(url, {
      method: 'post',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    }),
});
