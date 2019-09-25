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

router.get('/:id', async ({ user, params }, res) => {
  const _id = params.id

  try {
    const task = await Task.findOne({ _id, owner: user._id })

    if (!task) {
      return res.status(404).send()
    }

    res.status(200).send({ task })
  } catch (e) {
    res.status(404).send()
  }
})

router.patch('/:id', async ({ body, user, params }, res) => {
  const _id = params.id
  const updates = Object.keys(body)
  const allowedUpdates = ['title', 'description', 'completed']
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  )

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    const task = await Task.findOne({ _id, owner: user._id })

    if (!task) {
      return res.status(404).send()
    }

    updates.forEach(update => (task[update] = body[update]))
    await task.save()
    res.send(task)
  } catch (e) {
    res.status(400).send()
  }
})

router.delete('/:id', async ({ body }, res) => {})

module.exports = router
