const AWS = require('aws-sdk')
const https = require('https');

const ssm = new AWS.SSM();

exports.handler = async (event) => {
  return new Promise((resolve, reject) => {
    var params = {
      Names: [
        '/prd/write-code-everyday/slack-webhook-url'
      ],
      WithDecryption: true
    };
    ssm.getParameters(params, function(err, data) {
      console.log('[ssm#getParamerters', data)
      if (err) {
        console.error(err, err.stack);
        return reject(err)
      }

      const meta = JSON.stringify({
        username: 'node_bot',
        text: 'write code',
        icon_emoji: ':sunglasses:',
      });
      const options = {
        hostname: 'hooks.slack.com',
        port: 443,
        path: '/services/TK98YBPUL/B01JUB2714M/I9V2HkL1XwY8vT2oCT2IhCS0',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(meta),
        },
      };

      const req = https.request(options, (res) => {
        if (res.statusCode === 200) {
          return console.log('[request#success]' + res.statusCode);
        }
        console.log('[request#failed]' + res.statusCode);
      });

      req.on('error', (e) => {
        console.error(e);
      });

      req.write(data);
      req.end();
      resolve();
    });
  });
}
