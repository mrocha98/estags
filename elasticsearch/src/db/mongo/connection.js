const mongoose = require('mongoose')
const { uri, options } = require('../../config/mongo')

async function connect() {
  console.log('trying to connect with MongoDB...')

  mongoose.connect(uri, { ...options })

  mongoose.connection.on('error', () => console.error('❌ an error occurred while attempting to connect'))

  mongoose.connection.on('connected', () => console.log('✅ connection established'))
}

module.exports = connect
