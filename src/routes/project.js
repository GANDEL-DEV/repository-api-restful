const express = require('express')
const { getProjects, getProjectById, getProjectsByLanguage, createProject, updateProject, deleteProject } = require('../controller/project')
const projectRouter = express.Router()

// GET request
projectRouter.get('/get', getProjects)
projectRouter.get('/get/id/:id', getProjectById)
projectRouter.get('/get/language/:language', getProjectsByLanguage)


// POST request
projectRouter.post('/create', createProject)

// PUT request
projectRouter.put('/update/:id', updateProject)

// DELETE request
projectRouter.delete('/delete/:id', deleteProject)

module.exports = projectRouter
