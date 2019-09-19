const db = require('./db')

afterAll(() => {
  db.cleanupDatabase()
})

test('first test', () => {
  console.log('hello testing')
})
