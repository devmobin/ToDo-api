const User = require('../../src/models/user')
const Task = require('../../src/models/task')

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

const fakeTasks = [
  {
    title: 'go home'
  },
  {
    title: 'drink water',
    description: 'programmers have no any drink :)'
  },
  {
    title: 'edit project',
    completed: true
  }
]

const generateFakeData = async () => {
  await new User(fakeUsers[0]).save()
  await new User(fakeUsers[1]).save()
  await new User(fakeUsers[2]).save()

  const user = await User.find({ username: 'usertest2' })

  await new Task({ ...fakeTasks[0], owner: user[0]._id.toString() }).save()
  await new Task({ ...fakeTasks[1], owner: user[0]._id.toString() }).save()
  await new Task({ ...fakeTasks[2], owner: user[0]._id.toString() }).save()
}

const cleanupDatabase = async () => {
  await User.deleteMany({})
  await Task.deleteMany({})
}

module.exports = {
  cleanupDatabase,
  generateFakeData
}
