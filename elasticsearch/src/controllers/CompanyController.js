const { v4: generateUuid } = require('uuid')
const faker = require('faker')
const { client: elasticClient, indices } = require('../db/elasticsearch')

class CompanyController {
  async store(req, res) {
    const company = {
      id: generateUuid(),
      name: faker.company.companyName(),
      slogan: faker.company.bs(),
      origin: faker.address.country(),
      phone: faker.phone.phoneNumber()
    }
    console.log(company)

    try {
      await elasticClient.index({
        index: indices.company,
        body: company,
        refresh: true
      })

      return res.sendStatus(201)
    } catch (err) {
      return res.status(500).json(err)
    }
  }

  async search(req, res) {
    const { text } = req.query

    if (!text) return res.status(400).json({ error: 'missing text to search' })

    try {
      const { body: result } = await elasticClient.search({
        index: indices.company,
        body: {
          query: {
            match: {
              slogan: text
            }
          }
        }
      })
      return res.json(result.hits)
    } catch (err) {
      return res.status(500).json(err)
    }
  }
}

module.exports = new CompanyController()
