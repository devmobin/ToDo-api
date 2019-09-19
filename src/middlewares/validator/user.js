const validator = require('validator')

const User = require('../../models/user')

const signupValidation = async ({ body }, res, next) => {
  if (!body.username || !body.email || !body.password) {
    return res.status(400).send({
      error: 'please enter all the required fields [username, email, password]'
    })
  }

  if (!validator.isEmail(body.email)) {
    return res.status(400).send({ error: 'please enter valid email' })
  }

  const user = await User.findOne({
    $or: [{ email: body.email }, { username: body.username }]
  }).select('username email -_id')

  if (user) {
    if (user.username === body.username) {
      return res
        .status(400)
        .send({ error: `username '${body.username}' is already taken` })
    }

    if (user.email === body.email) {
      return res.status(400).send({ error: 'email is already exists' })
    }
  }

  if (
    !validator.isLength(validator.trim(body.password), {
      min: 7,
      max: 50
    }) ||
    body.password.includes('password')
  ) {
    return res.status(400).send({ error: 'please enter a better password' })
  }

  next()
}

const loginValidation = ({ body }, res, next) => {
  if (!body.email || !body.password) {
    return res.status(400).send({
      error: 'please enter all the required fields [email, password]'
    })
  }

  if (!validator.isEmail(body.email)) {
    return res.status(400).send({ error: 'please enter valid email' })
  }

  next()
}

module.exports = {
  signupValidation,
  loginValidation
}
