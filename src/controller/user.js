const User = require('../models/user')
const asyncHandler = require('express-async-handler')
const encryptToMD5 = require('../utils/crypto')

const getUsers = asyncHandler(async (request, response) => {
  try {
    const users = await User.find({})
    response.status(200).json(users)
  } catch (error) {
    response.status(error.status || 500).json(
      {
        message: error.message || 'Internal Server Error'
      }
    )
  }
})

const getUserById = asyncHandler(async (request, response) => {
  try {
    const { id } = request.params
    const user = await User.findById(id)
    if (!user) {
      response.status(error.status)
      throw new Error(`Can not find user with id [${id}]`)
    }
    response.status(200).json(user)
  } catch (error) {
    response.status(error.status || 500).json(
      {
        message: error.message || 'Internal Server Error'
      }
    )
  }
})

const createUser = asyncHandler(async (request, response) => {
  try {
    const user = request.body

    user.f4dcc3b5aa765d61d8327deb882cf99 = encryptToMD5(user.f4dcc3b5aa765d61d8327deb882cf99)
    user.dc4b06b824ec593239362517f538b29 = encryptToMD5(user.dc4b06b824ec593239362517f538b29)
    
    const userAux = await User.findOne({
      f4dcc3b5aa765d61d8327deb882cf99: user.f4dcc3b5aa765d61d8327deb882cf99,
      dc4b06b824ec593239362517f538b29: user.dc4b06b824ec593239362517f538b29,
    })
    
    if (userAux) {
      response.status(400).json({
        message: 'user is exists'
      })
    } else {
      await User.create(user)
      response.status(200).json(user)
    }
  } catch (error) {
    response.status(error.status || 500).json({
      message: error.message || 'Internal Server Error',
    })
  }
})


const deleteUser = asyncHandler(async (request, response) => {
  try {
    const { id } = request.params
    const user = await User.findByIdAndDelete(id)
    if (!user) {
      response.status(error.status)
      throw new Error(`Can not find user with id: ${id}`)
    }
    response.status(200).json(user)
  } catch (error) {
    response.status(error.status || 500).json({
      message: error.message || 'Internal Server Error',
    })
  }
})

const updateUser = asyncHandler(async (request, response) => {
  try {
    const { id } = request.params
    const user = await User.findById(id)

    if (!user) {
      response.status(404)
      throw new Error(`No user found with id: ${id}`)
    }

    const updateUserInfo = request.body

    if (updateUserInfo.f4dcc3b5aa765d61d8327deb882cf99) {
      updateUserInfo.f4dcc3b5aa765d61d8327deb882cf99 = encryptToMD5(updateUserInfo.f4dcc3b5aa765d61d8327deb882cf99)
    }
    if (updateUserInfo.dc4b06b824ec593239362517f538b29) {
      updateUserInfo.dc4b06b824ec593239362517f538b29 = encryptToMD5(updateUserInfo.dc4b06b824ec593239362517f538b29)
    }

    const existingUser = await User.findOne({ _id: id })

    if (!existingUser) {
      response.status(404)
      throw new Error(`User not found`)
    }

    const updateUser = await User.findByIdAndUpdate(id, updateUserInfo, { new: true })

    if (!updateUser) {
      response.status(500)
      throw new Error(`Failed to update User`)
    }

    response.status(200).json(updateUser)
  } catch (error) {
    response.status(error.status || 500).json({
      message: error.message || 'Internal Server Error',
    })
  }
})

module.exports = {getUsers, getUserById, createUser, deleteUser, updateUser}