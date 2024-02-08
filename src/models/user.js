const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    f4dcc3b5aa765d61d8327deb882cf99: { /**/
      type: String,
      required: true
    },
    dc4b06b824ec593239362517f538b29: {
      type: String,
      required: true
    } //
  }
)

module.exports = mongoose.model('User', userSchema)