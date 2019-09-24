const request = require('supertest')
const app = require('../src/app')
const db = require('./fixtures/db')
const User = require('../src/models/user')
const Task = require('../src/models/task')

beforeAll(async () => {
  await db.generateFakeData()
}, 1000)

afterAll(async () => {
  db.cleanupDatabase()
}, 1000)

// test user token
// for testing end points that needs authentication
let token

// create new task
test('success create new task', async () => {
  // before test tasks create new user
  const response = await request(app)
    .post('/user/signup')
    .send({
      username: 'mobin',
      email: 'mobin@gmail.com',
      password: 'mobin1234'
    })
  token = response.body.token

  // create new task
  await request(app)
    .post('/task/new')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: 'finish project'
    })
    .expect(201)
})

test('failure create new task anAuthenticated user', async () => {
  await request(app)
    .post('/task/new')
    .send({
      title: 'finish project'
    })
    .expect(401)
})
