import fetch from 'node-fetch';

export const notify = async (
  url: string,
  payload: {
    username: string;
    text: string;
    icon_emoji: string;
  }
): Promise<void> => {
  const res = await fetch(url, {
    method: 'post',
    body: JSON.stringify(payload),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) {
    console.error('[slack#notify]failed: ', res);
  }
  console.log('[slack#notify]succeeded');
};
