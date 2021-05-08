const passport = require('passport');
const usersController = require('../controllers/usersController');
const authController = require('../controllers/authController');
const userValidator = require('../validator/userValidator');
const jwt = require('jsonwebtoken');

module.exports = function(router) {
  router.get('/login', usersController.showLoginPage);
  router.get('/register', usersController.showRegisterPage)
  router.post('/register', userValidator, usersController.saveUser)
  router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),
    (req, res) => {
      const token = jwt.sign({ data: req.body.email }, 'secret', { expiresIn: '1h' });
      res.cookie('jwt', token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
      res.redirect('/posts')
    })
  router.get('/logout', authController.logout)
}