const request = require('supertest')
const app = require('../src/app')
const db = require('./fixtures/db')

afterAll(() => {
  db.cleanupDatabase()
}, 1000)

// signup tests
test('success signup user', async () => {
  const response = await request(app)
    .post('/user/signup')
    .send({
      username: 'mobin',
      email: 'mobin@gmail.com',
      password: 'mobin1234'
    })
    .expect(201)
})

test('failure signup user required field', async () => {
  const response = await request(app)
    .post('/user/signup')
    .send({
      email: 'mobin@gmail.com',
      password: 'mobin1234'
    })
    .expect(400)
})

test('failure signup user invalid email', async () => {
  const response = await request(app)
    .post('/user/signup')
    .send({
      username: 'mobin',
      email: 'mobingmail.com',
      password: 'mobin1234'
    })
    .expect(400)
})
