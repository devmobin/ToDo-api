const User = require('../../src/models/user')

const fakeUsers = [
  {
    username: 'usertest1',
    email: 'usertest1@mail.com',
    password: '12345678'
  },
  {
    username: 'usertest2',
    email: 'usertest2@mail.com',
    password: '12345678'
  },
  {
    username: 'usertest3',
    email: 'usertest3@mail.com',
    password: '12345678'
  }
]

const generateFakeData = async () => {
  fakeUsers.forEach(async user => {
    await new User(user).save()
  })
}

const cleanupDatabase = async () => {
  await User.deleteMany({})
}

module.exports = {
  cleanupDatabase,
  generateFakeData
}
