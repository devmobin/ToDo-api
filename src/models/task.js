const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    completed: {
      type: Boolean,
      default: false
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      require: true
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Task', taskSchema)
