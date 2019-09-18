const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('../config/config')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

app.use(express.json())
app.use(cors())

app.use(userRouter)
app.use(taskRouter)

mongoose.connect(config.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

module.exports = app
