const User = require('../../src/models/user')

const cleanupDatabase = async () => {
  await User.deleteMany({})
}

module.exports = {
  cleanupDatabase
}
