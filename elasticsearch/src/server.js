const { express: app } = require('./app')
const { connection } = require('./db/mongo')

;(async () => {
  await connection()
  app.listen(3333)
})()
