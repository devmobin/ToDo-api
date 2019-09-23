const User = require('../models/user')

const checkUserExist = async (email, username) => {
  const user = await User.findOne({
    $or: [{ email }, { username }]
  }).select('username email -_id')

  if (user) {
    if (user.username === username) {
      return `username '${username}' is already taken`
    }

    if (user.email === email) {
      return 'email is already exists'
    }
  }
}

module.exports = checkUserExist
