const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true
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
      required: true,
      validate(value) {}
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      validate(value) {}
    }
    // tokens: [tokenSchema]
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

module.exports = mongoose.model('User', userSchema)
