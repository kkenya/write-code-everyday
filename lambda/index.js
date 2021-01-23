const AWS = require("aws-sdk");
const https = require("https");
const fetch = require("node-fetch");
const util = require("util");
const { promisify } = util;

const SSM_VERSION = "2014-11-06";

const ssm = new AWS.SSM({ apiVersion: SSM_VERSION });

exports.handler = async (event) => {
  return new Promise(async (resolve, reject) => {
    const parameterNames = {
      Names: ["/prd/write-code-everyday/slack-webhook-url"],
      WithDecryption: true,
    };
    const mock = async () => ({
      Parameters: [
        {
          Name: "testParameter",
          Type: "SecureString",
          Value: "test",
          Version: 1,
          LastModifiedDate: "2021-01-17T13:09:12.036Z",
          ARN: "test",
          DataType: "text",
        },
      ]
    });
    // const parameters = await ssm
    //   .getParameters(parameterNames)
    //   .promise()
    //   .catch((e) => console.error(e));
    const parameters = await mock(parameterNames);
    console.log("[ssm#getParamerters", parameters);
    const [webHookUrlParam] = parameters.Parameters;

    const data = {
      username: "write-code-everyday",
      text: "write code",
      icon_emoji: ":fire:",
    };

    console.log(webHookUrlParam.Value);
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
  });
};
