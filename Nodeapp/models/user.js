const bcrypt = require('bcrypt');
const { userModel } = require('./index');

module.exports = {
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