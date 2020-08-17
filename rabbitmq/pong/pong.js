const amqp = require('amqplib/callback_api')
const sms = require('./sms')

console.log('PONG!\n')
console.log('Reading SMS from queue...\n')
amqp.connect('amqp://localhost', (connError, connection) => {
  if (connError) {
    throw connError
  }

  connection.createChannel((channelError, channel) => {
    if (channelError) {
      throw channelError
    }

    const QUEUE = 'sms'
    channel.assertQueue(QUEUE)

    channel.consume(
      QUEUE,
      (msg) => {
        const stringMsg = msg.content.toString()
        const encoded = sms.messageToCode(stringMsg)
        console.log(`Message received: ${encoded}`)
      },
      {
        noAck: true
      }
    )
  })
})
