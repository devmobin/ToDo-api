const express = require('express')

const User = require('../models/user')
const validator = require('../middlewares/validator/user')
const auth = require('../middlewares/authentication/auth')

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
    res.status(400).send({ error: e.message })
  }
})

router.get('/me', auth, async ({ user }, res) => res.send(user))

router.patch(
  '/me',
  auth,
  validator.editUserProfile,
  async ({ body, user }, res) => {
    try {
      updates.forEach(update => (user[update] = body[update]))

      await user.save()

      res.send(user)
    } catch (e) {
      res.status(500).send()
    }
  }
)

router.delete('/me', auth, async ({ user }, res) => {
  try {
    await user.remove()
    res.status(200).send({ user })
  } catch (e) {
    res.status(500).send()
  }
})

router.get('/logout', auth, async ({ token, user }, res) => {
  try {
    user.tokens = user.tokens.filter(t => t.token !== token)

    await user.save()

    res.status(200).send()
  } catch (e) {
    res.status(500).send()
  }
})

router.get('/logoutAll', auth, async ({ user }, res) => {
  try {
    user.tokens = []

    await user.save()
    res.status(200).send()
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = router
