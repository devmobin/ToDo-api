const express = require('express')

const User = require('../models/user')
const validator = require('../middlewares/validator/user')

const router = express.Router()

router.post('/signup', validator.signupValidation, async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()

    const token = await user.generateAuthToken()

    res.status(201).send({ user, token })
  } catch (e) {
    res.status(500).send()
  }
})

router.post('/login', async (req, res) => {})

router.get('/me', async (req, res) => {})

router.patch('/me', async (req, res) => {})

router.delete('/me', async (req, res) => {})

router.get('/logout', async (req, res) => {})

router.get('/logoutAll', async (req, res) => {})

module.exports = router
