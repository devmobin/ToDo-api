const express = require('express')

const User = require('../models/user')
const validator = require('../middlewares/validator/user')

const router = express.Router()

router.post('/signup', validator.signupValidation, async ({ body }, res) => {
  const user = new User(body)

  try {
    await user.save()

    const token = await user.generateAuthToken()

    res.status(201).send({ user, token })
  } catch (e) {
    res.status(500).send()
  }
})

router.post('/login', validator.loginValidation, async ({ body }, res) => {
  try {
    const user = await User.loginEmailPass(body.email, body.password)

    const token = await user.generateAuthToken()

    res.status(200).send({ user, token })
  } catch (e) {
    console.log(e)
    res.status(400).send()
  }
})

router.get('/me', async ({ body }, res) => {})

router.patch('/me', async ({ body }, res) => {})

router.delete('/me', async ({ body }, res) => {})

router.get('/logout', async ({ body }, res) => {})

router.get('/logoutAll', async ({ body }, res) => {})

module.exports = router
