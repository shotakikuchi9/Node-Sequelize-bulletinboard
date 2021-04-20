require('dotenv').config()
const env = process.env
const Sequelize = require('sequelize')
const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {
  host: env.DB_HOST,
  dialect: 'mysql'
})

module.exports.userModel = sequelize.define(
  'users',
  {
    id: {
      field: 'id',
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      field: 'name',
      type: Sequelize.STRING
    },
    email: {
      field: 'email',
      type: Sequelize.STRING
    },
    password: {
      field: 'password',
      type: Sequelize.STRING
    },
  }
  
)