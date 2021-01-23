import AWS from 'aws-sdk';
// const fetch = require("node-fetch");

// const SSM_VERSION = "2014-11-06";

// const ssm = new AWS.SSM({ apiVersion: SSM_VERSION });

exports.handler = async (/* event */) => {
  const config = {
    Names: ['/prd/write-code-everyday/slack-webhook-url'],
    WithDecryption: true,
  };
  const mock = async (parameterNames: AWS.SSM.Types.GetParametersRequest) => ({
    Parameters: [
      {
        Name: parameterNames,
        Type: 'SecureString',
        Value: 'test',
        Version: 1,
        LastModifiedDate: '2021-01-17T13:09:12.036Z',
        ARN: 'test',
        DataType: 'text',
      },
    ],
  });
  // const parameters = await ssm
  //   .getParameters(config)
  //   .promise()
  //   .catch((e) => console.error(e));
  const parameters = await mock(config);
  console.log('[ssm#getParamerters', parameters);
  const [webHookUrlParam] = parameters.Parameters;
  if (!webHookUrlParam) {
    throw new Error('not found');
  }
  console.log(webHookUrlParam.Value);

  // const data = {
  //   username: "write-code-everyday",
  //   text: "write code",
  //   icon_emoji: ":fire:",
  // };

  // const res = await fetch(webHookUrlParam.Name, {
  //   method: "post",
  //   body: JSON.stringify(data),
  //   headers: { "Content-Type": "application/json" },
  // });
  // if (!res.ok) {
  //   console.error(res);
  // }
  // console.log(res);
  // const json = await res.json();

  // console.log(json);
};
