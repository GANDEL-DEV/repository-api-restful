const crypto = require('crypto')

function encryptToMD5(text) {
  const hash = crypto.createHash('md5')
  hash.update(text)
  return hash.digest('hex')
}

module.exports = encryptToMD5