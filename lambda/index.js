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
    const parameters = await ssm
      .getParameters(parameterNames)
      .promise()
      .catch((e) => console.error(e));
    console.log("[ssm#getParamerters", parameters.Parameters);
    const [webHookUrlParam] = parameters.Parameters;

    console.log("----------------params---------------");
    console.log(parameterNames);

    const data = {
      username: "write-code-everyday",
      text: "write code",
      icon_emoji: ":fire:",
    };

    const res = await fetch(webHookUrlParam.Name, {
      method: "post",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      console.error(res);
    }
    console.log(res);
    const json = await res.json();

    console.log(json);
  });
};
