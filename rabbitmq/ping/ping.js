const amqp = require('amqplib/callback_api')
const readLine = require('readline-sync')

console.log('PING!\n')

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

    const message = readLine.question('Type your message:\n|\n|-> ')
    channel.sendToQueue(QUEUE, Buffer.from(message))
    console.log(`Message ${message} send in ${QUEUE} queue...\n\n`)
  })
})
