import Sequelize from 'sequelize'
import mongoose from 'mongoose'

import Category from '../app/models/Category.js'
import Product from '../app/models/Product.js'
import User from '../app/models/User.js'

// import configDataBase from '../config/database'

const models = [User, Product, Category]

class Database {
  constructor() {
    this.init()
    this.mongo()
  }

  init() {
    this.connection = new Sequelize('postgresql://postgres:ezarV6wmxv6hg19SKqaM@containers-us-west-56.railway.app:5650/railway')
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      )
  }
  mongo() {
    this.mongoConnection = mongoose.connect(
     "mongodb://mongo:OQSv1pMsRliUvgu18iJd@containers-us-west-71.railway.app:6686",
      {
        useNewUrlParser:true,
        useUnifiedTopology:true,
      }
    )
  }
}
export default new Database()
