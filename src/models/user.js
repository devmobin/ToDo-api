const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const tokenSchema = new mongoose.Schema(
  {
    token: {
      type: String
    }
  },
  {
    _id: false
  }
)

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true
    },
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      required: true
    },
    password: {
      type: String,
      required: true,
      trim: true
    },
    tokens: [tokenSchema]
  },
  {
    timestamps: true
  }
)

userSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner'
})

userSchema.methods.generateAuthToken = async function() {
  const user = this

  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

  user.tokens.push({ token })
  await user.save()

  return token
}

module.exports = mongoose.model('User', userSchema)
