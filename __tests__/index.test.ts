import assert from 'assert';
import sinon from 'sinon';
import { handler, awsSdk, slackSdk, SLACK } from '../src';

const sandbox = sinon.createSandbox();

afterEach(async () => {
  sandbox.restore();
});

describe('lambda function', () => {
  describe('hander', () => {
    test('正しく終了すること', async () => {
      const parameterName = '/prd/write-code-everyday/slack-webhook-url';
      const ssmMock = sandbox.mock(awsSdk.ssm);
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

      const slackSdkMock = sandbox.mock(slackSdk);
      slackSdkMock
        .expects('notify')
        .once()
        .withArgs('https://hooks.slack.com/services/XXX1/XXX2/XXXX3', {
          status: 200,
          statusText: 'OK',
        })
        .resolves({});

      try {
        await handler();
      } catch (e) {
        assert.fail();
      }
      assert(true);
      ssmMock.verify();
      slackSdkMock.verify();
    });
  });
});
