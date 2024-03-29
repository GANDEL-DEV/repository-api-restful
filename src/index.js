const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')

const projectRoutes = require('./routes/project')
const languageRoutes = require('./routes/language')
const userRoutes = require('./routes/user')

const mongoose = require('mongoose')

const port = process.env.PORT || 5000

app.use(cors())

app.use(express.json())
app.use('/api/project', projectRoutes)
app.use('/api/language', languageRoutes)
app.use('/api/user', userRoutes)

app.get('/', (request, response) => {
  response.send('Welcome GANDEL DEV')
})

mongoose.connect(
  process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }
).then(
  console.log('CONNECTION SUCCESSFULLY :D')
).catch(
  (error) => {
    console.error(error)
  }
)

app.listen(port, () => {
  console.log(`The GANDEL API is running in the ${port} port`)
})