const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const mongoosastic = require('mongoosastic')
const { client: esClient } = require('../db/elasticsearch')

const CompanySchema = mongoose.Schema(
  {
    name: {
      type: String,
      es_indexed: true,
      required: true,
      unique: true
    },
    slogan: {
      type: String,
      es_indexed: true
    },
    origin: {
      type: String,
      required: true
    },
    phone: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

CompanySchema.plugin(mongoosePaginate)
CompanySchema.plugin(mongoosastic, { esClient })

const CompanyModel = mongoose.model('companies', CompanySchema)

module.exports = CompanyModel
