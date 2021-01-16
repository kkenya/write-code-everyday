const https = require('https')
const url = "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html"

exports.handler = async (event) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
        resolve(res.statusCode)
      }).on('error', (e) => {
        reject(Error(e))
      })
    })
}
