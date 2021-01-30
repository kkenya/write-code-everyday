import assert from 'assert';
import sinon from 'sinon';
import { handler } from '../src';
import { sdk } from '../src/lib';

const sandbox = sinon.createSandbox();

afterEach(async () => {
  sandbox.restore();
});

describe('lambda function', () => {
  describe('hander', () => {
    test('正しく終了すること', async () => {
      const parameterName = '/prd/write-code-everyday/slack-webhook-url';
      const ssmMock = sandbox.mock(sdk.aws.ssm);
      ssmMock
        .expects('getParameter')
        .once()
        .withArgs({
          Name: parameterName,
          WithDecryption: true,
        })
        .returns({
          promise: async () => ({
            Parameter: {
              Name: parameterName,
              Type: 'SecureString',
              Value: 'https://hooks.slack.com/services/XXX1/XXX2/XXXX3',
              Version: 1,
              LastModifiedDate: '2021-01-01T00:00:00.000Z',
              ARN: 'arn:aws:ssm:ap-northeast-1:111111111111:parameter/test',
              DataType: 'text',
            },
          }),
        });

      const slackSdkMock = sandbox.mock(sdk.slack);
      slackSdkMock
        .expects('notify')
        .once()
        .withArgs('https://hooks.slack.com/services/XXX1/XXX2/XXXX3', {
          username: 'write-code-everyday',
          text: 'write code',
          icon_emoji: ':evergreen_tree:',
        })
        .resolves({
          ok: true,
        });

      try {
        await handler();
      } catch (e) {
        assert.fail(e);
      }
      assert(true);
      ssmMock.verify();
      slackSdkMock.verify();
    });
  });
});
