const { Router } = require('express')

const routes = Router()

const CompanyController = require('./controllers/CompanyController')

routes.get('/companies', CompanyController.search)
routes.post('/companies', CompanyController.store)

module.exports = routes
