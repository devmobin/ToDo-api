const validator = require('validator')

const User = require('../../models/user')

const signupValidation = async (req, res, next) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    return res.status(400).send({
      error: 'please enter all the required fields [username, email, password]'
    })
  }

  if (!validator.isEmail(req.body.email)) {
    return res.status(400).send({ error: 'please enter valid email' })
  }

  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  }).select('username email -_id')

  if (user) {
    if (user.username === req.body.username) {
      return res
        .status(400)
        .send({ error: `username '${req.body.username}' is already taken` })
    }

    if (user.email === req.body.email) {
      return res.status(400).send({ error: 'email is already exists' })
    }
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
