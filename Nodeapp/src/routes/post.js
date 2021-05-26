const usersController = require('../controllers/usersController');
const authController = require('../controllers/authController');
const postsController = require('../controllers/postsController');
const postValidator = require('../validator/postValidator');

module.exports = function(router) {
  router.get('/posts', authController.vertifyToken, postsController.showPostsData)
  router.get('/posts/regist', authController.vertifyToken, usersController.showRegistPage)
  router.post('/posts/regist', authController.vertifyToken, postValidator, postsController.savePostData)
  router.get('/posts/:id/delete', authController.vertifyToken, postsController.deletePostData)
  router.get('/posts/:id/edit', authController.vertifyToken, postsController.showEditPage)
  router.post('/posts/:id/update', authController.vertifyToken, postValidator, postsController.updatePost)
  router.get('/posts/:id/like', authController.vertifyToken, postsController.likePost)
}
