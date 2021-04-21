const bcrypt = require('bcrypt');
const { userModel } = require('./index');
require('dotenv').config()
const env = process.env
const Sequelize = require('sequelize')
const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {
  host: env.DB_HOST,
  dialect: 'mysql'
})
exports.userModel = sequelize.define(
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

module.exports = {
  userModel: sequelize.define(
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
  ),
  createUser: function (userData) {
    userModel.create(userData);
  },
  checkUserData: async function (req, email, password, done) {
    const reqEmail = email
    const reqPass = password
    userModel.findAll({
      where: { email: reqEmail }
    }).then((users) => {
      if (users.length === 1) {
        bcrypt.compare(reqPass, users[0].password)
          .then((isCorrectPassword) => {
            if (isCorrectPassword) {
              done(null, email)
            } else {
              done(null, false, { message: 'Eメールまたはパスワードが正しくありません。' })
            }
          })
      } else {
        done(null, false, { message: 'Eメールまたはパスワードが正しくありません。' })
      }
    })
  },
  fetchUserDara: function (email, done) {
    userModel.findAll({
      where: { email: email }
    }).then((users, err) => {
      done(err, users[0])
    })
  }
}