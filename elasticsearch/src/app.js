const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const routes = require('./routes')

class App {
  constructor() {
    this.express = express()

    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.express.use(express.json())
    this.express.use(helmet())
    this.express.use(morgan('dev'))
  }

  routes() {
    this.express.use(routes)
  }
}

module.exports = new App()
