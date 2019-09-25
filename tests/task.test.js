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
let token, taskId

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
  const responseTask = await request(app)
    .post('/task/new')
    .set('Authorization', `Bearer ${token}`)
    .send({
      title: 'finish project'
    })
    .expect(201)
  taskId = responseTask.body._id
})

test('failure create new task anAuthenticated user', async () => {
  await request(app)
    .post('/task/new')
    .send({
      title: 'finish project'
    })
    .expect(401)
})

// read all tasks
test('success read all tasks', async () => {
  await request(app)
    .get('/task/me')
    .set('Authorization', `Bearer ${token}`)
    .send()
    .expect(200)
})

test('failure read all tasks anAuthenticated user', async () => {
  await request(app)
    .get('/task/me')
    .send()
    .expect(401)
})

// read one task
test('success read one task', async () => {
  await request(app)
    .get(`/task/${taskId}`)
    .set('Authorization', `Bearer ${token}`)
    .send()
    .expect(200)
})

test('failure read one task', async () => {
  await request(app)
    .get(`/task/${taskId}`)
    .send()
    .expect(401)

  await request(app)
    .get(`/task/${taskId}q`)
    .set('Authorization', `Bearer ${token}`)
    .send()
    .expect(404)
})
