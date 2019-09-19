const validator = require('validator')

const User = require('../../models/user')

const signupValidation = async (req, res, next) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .send({ error: 'please enter all the required fields' })
  }

  if (!validator.isEmail(req.body.email)) {
    return res.status(400).send({ error: 'please enter valid email' })
  }

  const checkUsername = await User.findOne({ username: req.body.username })
  if (checkUsername) {
    return res.status(400).send({ error: 'username is already taken' })
  }

  const checkUserEmail = await User.findOne({ email: req.body.email })
  if (checkUserEmail) {
    return res.status(400).send({ error: 'email is used before' })
  }

  if (
    !validator.isLength(validator.trim(req.body.password), {
      min: 7,
      max: 50
    }) ||
    req.body.password.includes('password')
  ) {
    return res.status(400).send({ error: 'please enter a better password' })
  }

  next()
}

module.exports = {
  signupValidation
}
