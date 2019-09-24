const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const auth = require('./middlewares/authentication/auth')

const app = express()

app.use(express.json())
app.use(cors())

app.use('/user', userRouter)
app.use('/task', auth, taskRouter)

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

module.exports = app
