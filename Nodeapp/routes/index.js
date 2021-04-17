var express = require('express');
const passport = require('passport');
var router = express.Router();
const usersController = require('../controllers/usersController');
const authController = require('../controllers/authController')
const validator = require('../validator')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
/* GET home page. */
router.get('/login', usersController.showLoginPage);
router.get('/register', usersController.showRegisterPage)
router.post('/register',validator, usersController.saveUser)
router.post('/login', passport.authenticate('local', {failureRedirect: '/login'}),
(req, res) => {
  // User.fetchUserDara(req, res, req.user)
  console.log(req.user);
  const token = jwt.sign({ data: req.body.email}, 'secret', { expiresIn: '1m' });
  res.cookie('jwt', token, {httpOnly: true, maxAge: 60 * 1000})
  res.redirect('/posts')
})
router.get('/posts', authController.vertifyToken, usersController.showPostsPage)
router.get('/posts/regist', authController.vertifyToken, usersController.showRegistPage)
router.get('/logout', authController.logout)

module.exports = router;
