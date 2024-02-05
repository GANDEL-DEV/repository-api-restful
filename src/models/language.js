const mongoose = require('mongoose')

const languageSchema = mongoose.Schema(
  {
    language: {
      type: String,
      required: true
    },
    languageIcon: {
      type: String,
      required: true
    }
  }
)

module.exports = mongoose.model('Language', languageSchema)