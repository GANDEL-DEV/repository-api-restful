const Project = require('../models/project')
const asyncHandler = require('express-async-handler')
const validateProject = require('../utils/project')

const getProjects = asyncHandler(async (request, response) => {
  try {
    const projects = await Project.find({})
    response.status(200).json(projects)
  } catch (error) {
    response.status(error.status || 500).json(
      {
        message: error.message || 'Internal Server Error'
      }
    )
  }
})

const getProjectById = asyncHandler(async (request, response) => {
  try {
    const { id } = request.params
    const project = await Project.findById(id)
    if (!project) {
      response.status(error.status)
      throw new Error(`Can not find project with id [${id}]`)
    }
    response.status(200).json(project)
  } catch (error) {
    response.status(error.status || 500).json(
      {
        message: error.message || 'Internal Server Error'
      }
    )
  }
})

const getProjectsByLanguage = asyncHandler(async (request, response) => {
  try {
    const { language } = request.params
    const listProjects = await Project.find(
      {
        language: language
      }
    )
    if (listProjects.length === 0) {
      response.status(404).json(
        {
          error: `No ${language} projects`
        }
      )
    } else {
      response.status(200).json(listProjects)
    }
  } catch (error) {
    response.status(error.status || 500).json(
      {
        message: error.message || 'Internal Server Error'
      }
    )
  }
})

const createProject = asyncHandler(async (request, response) => {
  try {
    const project = request.body
    await validateProject(project)
    const projectAux = await Project.findOne(
      {
        projectName: project.projectName,
        repositoryUrl: project.repositoryUrl
      }
    )
    if (projectAux) {
      response.status(400).json(
        {
          message: `${project.projectName} is exists`
        }
      )
    } else {
      await Project.create(project)
      response.status(200).json(project)
    }
  } catch (error) {
    response.status(error.status || 500).json({
      message: error.message || 'Internal Server Error',
    })
  }
})

const deleteProject = asyncHandler(async (request, response) => {
  try {
    const { id } = request.params
    const project = await Project.findByIdAndDelete(id)
    if (!project) {
      response.status(error.status)
      throw new Error(`Can not find project with id: ${id}`)
    }
    response.status(200).json(project)
  } catch (error) {
    response.status(error.status || 500).json({
      message: error.message || 'Internal Server Error',
    })
  }
})

const updateProject = asyncHandler(async (request, response) => {
  try {
    const { id } = request.params
    const project = await Project.findById(id)
    if (!project) {
      response.status(404);
      throw new Error(`No project found with id: ${id}`);
    }

    const updateProjectInfo = request.body
    await validateProject(updateProjectInfo)
    const existingProject = await Project.findOne({
      _id: id
    })

    if (!existingProject) {
      response.status(404)
      throw new Error(`Project ${updateProjectInfo.projectName} not found`)
    }

    const updateProject = await Project.findByIdAndUpdate(id, updateProjectInfo, { new: true })

    if (!updateProject) {
      response.status(500)
      throw new Error(`Failed to update project`)
    }

    response.status(200).json(updateProject)
  } catch (error) {
    response.status(error.status || 500).json({
      message: error.message || 'Internal Server Error',
  });
  }
})

module.exports = { getProjects, getProjectById, getProjectsByLanguage, createProject, deleteProject, updateProject }