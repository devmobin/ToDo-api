const express = require('express')

const Task = require('../models/task')
const validator = require('../middlewares/validator/task')

const router = express.Router()

router.post('/new', validator.createNewTask, async ({ body, user }, res) => {
  const task = new Task({ ...body, owner: user._id.toString() })

  try {
    await task.save()

    res.status(201).send(task)
  } catch (e) {
    res.status(500).send()
  }
})

router.get('/me', async ({ user }, res) => {
  try {
    await user
      .populate({
        path: 'tasks'
      })
      .execPopulate()

    res.status(200).send(user.tasks)
  } catch (e) {
    res.status(500).send()
  }
})

router.get('/:id', async ({ body }, res) => {})

router.patch('/:id', async ({ body }, res) => {})

router.delete('/:id', async ({ body }, res) => {})

module.exports = router
