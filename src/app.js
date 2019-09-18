const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

app.use(express.json())
app.use(cors())

app.use(userRouter)
app.use(taskRouter)

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

module.exports = app
