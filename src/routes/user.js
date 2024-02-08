const express = require('express')
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controller/user')
const userRouter = express.Router()

// GET request
userRouter.get('/get', getUsers)
userRouter.get('/get/:id', getUserById)

// POST request
userRouter.post('/create', createUser)

// PUT request
userRouter.put('/update/:id', updateUser)

// DELETE request
userRouter.delete('/delete/:id', deleteUser)

module.exports = userRouter