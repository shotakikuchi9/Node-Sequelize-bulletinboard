var express = require('express');
const passport = require('passport');
var router = express.Router();
const usersController = require('../controllers/usersController');
const authController = require('../controllers/authController');
const postsController = require('../controllers/postsController');
const userValidator = require('../validator/userValidator');
const postValidator = require('../validator/postValidator');
const jwt = require('jsonwebtoken')

router.get('/login', usersController.showLoginPage);
router.get('/register', usersController.showRegisterPage)
router.post('/register', userValidator, usersController.saveUser)
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res) => {
    const token = jwt.sign({ data: req.body.email }, 'secret', { expiresIn: '1h' });
    res.cookie('jwt', token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
    res.redirect('/posts')
  })
router.get('/posts', authController.vertifyToken, postsController.showPostsData)
router.get('/posts/regist', authController.vertifyToken, usersController.showRegistPage)
router.get('/logout', authController.logout)
router.post('/posts/regist', authController.vertifyToken, postValidator, postsController.savePostData)
router.get('/posts/:id/delete', authController.vertifyToken, postsController.deletePostData)
router.get('/posts/:id/edit', authController.vertifyToken, postsController.showEditPage)
router.post('/posts/:id/update', authController.vertifyToken, postValidator, postsController.updatePost)

module.exports = router;
