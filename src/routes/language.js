const express = require('express')
const { getLanguages, getLanguageById, createLanguage, updateLanguage, deleteLanguage } = require('../controller/language')
const languageRouter = express.Router()

// GET request
languageRouter.get('/get', getLanguages)
languageRouter.get('/get/id/:id', getLanguageById)

// POST request
languageRouter.post('/create', createLanguage)

// PUT request
languageRouter.put('/update/:id', updateLanguage)

// DELETE request
languageRouter.delete('/delete/:id', deleteLanguage)

module.exports = languageRouter