const CompanyModel = require('../models/Company')
const faker = require('faker')

class CompanyController {
  async store(req, res) {
    const mockCompany = {
      name: faker.company.companyName(),
      slogan: faker.company.bs(),
      origin: faker.address.country(),
      phone: faker.phone.phoneNumber()
    }

    try {
      const company = await CompanyModel.findOne({ name: mockCompany.name })

      if (company) return res.status(400).json({ error: 'This company name is already in use' })

      await CompanyModel.create(mockCompany)

      return res.status(201).json(mockCompany)
    } catch (err) {
      return res.status(500).json(err)
    }
  }

  async search(req, res) {
    const { text } = req.query

    if (!text) return res.status(400).json({ error: 'missing text to search' })

    try {
      CompanyModel.search({
        query_string: {
          query: {
            // TODO
          }
        }
      })
    } catch (err) {
      return res.status(500).json(err)
    }
  }
}

module.exports = new CompanyController()
