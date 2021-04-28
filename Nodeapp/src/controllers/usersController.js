const { User, Post } = require('../sequelize')
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
module.exports = {
  showLoginPage: function (req, res) {
    res.render('login')
  },
  showRegisterPage: function (req, res) {
    res.render('register')
  },
  saveUser: async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      res.redirect('login')
    } else {
      const SALT_ROUND = 10
      const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUND);
      const userData = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      }
      await User.create(userData);
      res.redirect('/posts')
    }
  },
  checkUserData: async function (req, email, password, done) {
    const reqEmail = email
    const reqPass = password
    User.findAll({
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
    User.findAll({
      where: { email: email }
    }).then((users, err) => {
      done(err, users[0])
    })
  },
  showRegistPage: function (req, res) {
    res.render('regist', { userData: req.user });
  }
};