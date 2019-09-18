const express = require('express')

const User = require('../models/user')
const validator = require('../middlewares/validator/user')

const router = express.Router()

router.post('/user/signup', validator.signupValidation, async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    res.status(201).send(user)
  } catch (e) {
    res.status(500).send()
  }
})

router.post('/user/login', async (req, res) => {})

router.get('/user/me', async (req, res) => {})

router.patch('/user/me', async (req, res) => {})

router.delete('/user/me', async (req, res) => {})

router.get('/user/logout', async (req, res) => {})

router.get('/user/logoutAll', async (req, res) => {})

module.exports = router
