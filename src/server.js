const app = require('./app')
const config = require('../config/config')

app.listen(config.PORT, () => {
  console.log(`app is running on port: ${config.PORT}`)
})
