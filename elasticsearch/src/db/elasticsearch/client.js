const { Client } = require('@elastic/elasticsearch')

const client = new Client({ node: 'http://localhost:9201' })

module.exports = client
