const validator = require('validator')

const signupValidation = (req, res, next) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .send({ error: 'please enter all the required fields' })
  }

  if (!validator.isEmail(req.body.email)) {
    return res.status(400).send({ error: 'please enter valid email' })
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
