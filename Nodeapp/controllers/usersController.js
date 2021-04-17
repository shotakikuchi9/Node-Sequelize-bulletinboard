const User = require('../models/user')
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const user = require('../models/user');
const jwt = require('jsonwebtoken')
module.exports = {
  showLoginPage: function(req, res) {
    res.render('login')
  },
  showRegisterPage: function(req, res) {
    res.render('register')
  },
  saveUser: async function(req, res) {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      console.log(errors);
      res.redirect('login')
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      let userData = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      }
      console.log(userData);
      User.createUser(userData);
      res.render('posts', {userData: userData});
    }
  },
  showPostsPage: function(req, res) {
    res.render('posts', {userData: req.user});
  },
  showRegistPage: function(req, res) {
    res.render('regist', {userData: req.user})
  }

};