const mongoose = require('mongoose')

const projectSchema = mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true
    },
    coverImageUrl: {
      type: String,
      required: true
    },
    littleCoverImageUrl: {
      type: String,
      required: true
    },
    projectDescription: {
      type: String,
      required: true
    },
    repositoryUrl: {
      type: String,
      required: true
    },
    language: {
      type: String,
      required: true
    },
    dateOfCreation: {
      type: Date,
      required: true
    },
    demoUrl: {
      type: String,
      required: false
    }
  }
)

module.exports = mongoose.model('Project', projectSchema)