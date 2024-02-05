const Language = require('../models/language')
const asyncHandler = require('express-async-handler')
const validateLanguage = require('../utils/language')

const getLanguages = asyncHandler(async (request, response) => {
  try {
    const languages = await Language.find({})
    response.status(200).json(languages)
  } catch (error) {
    response.status(error.status || 500).json(
      {
        message: error.message || 'Internal Server Error'
      }
    )
  }
})

const getLanguageById = asyncHandler(async (request, response) => {
  try {
    const { id } = request.params
    const language = await Language.findById(id)
    if (!language) {
      response.status(error.status)
      throw new Error(`Can not find language with id [${id}]`)
    }
    response.status(200).json(language)
  } catch (error) {
    response.status(error.status || 500).json(
      {
        message: error.message || 'Internal Server Error---'
      }
    )
  }
})

const createLanguage = asyncHandler(async (request, response) => {
  try {
    const language = request.body
    await validateLanguage(language)
    const languageAux = await Language.findOne(
      {
        language: language.language
      }
    )
    if (languageAux) {
      response.status(400).json(
        {
          message: `${language.language} is exists`
        }
      )
    } else {
      await Language.create(language)
      response.status(200).json(language)
    }
  } catch (error) {
    response.status(error.status || 500).json({
      message: error.message || 'Internal Server Error',
    })
  }
})

const deleteLanguage = asyncHandler(async (request, response) => {
  try {
    const { id } = request.params
    const language = await Language.findByIdAndDelete(id)
    if (!language) {
      response.status(error.status)
      throw new Error(`Can not find language with id: ${id}`)
    }
    response.status(200).json(language)
  } catch (error) {
    response.status(error.status || 500).json({
      message: error.message || 'Internal Server Error',
    })
  }
})

const updateLanguage = asyncHandler(async (request, response) => {
  try {
    const { id } = request.params
    const language = await Language.findById(id)
    if (!language) {
      response.status(404);
      throw new Error(`No language found with id: ${id}`);
    }

    const updateLanguageInfo = request.body
    await validateLanguage(updateLanguageInfo)
    const existingLanguage = await Language.findOne({
      _id: id
    })

    if (!existingLanguage) {
      response.status(404)
      throw new Error(`Language ${updateLanguageInfo.language} not found`)
    }

    const updateLanguage = await Language.findByIdAndUpdate(id, updateLanguageInfo, { new: true })

    if (!updateLanguage) {
      response.status(500)
      throw new Error(`Failed to update Language`)
    }

    response.status(200).json(updateLanguage)
  } catch (error) {
    response.status(error.status || 500).json({
      message: error.message || 'Internal Server Error',
  });
  }
})

module.exports = { getLanguages, getLanguageById, createLanguage, deleteLanguage, updateLanguage }