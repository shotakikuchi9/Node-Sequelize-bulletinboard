const { Post, User } = require('../sequelize')
const { check, validationResult } = require('express-validator');
module.exports = {
  savePostData: async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      res.redirect('/posts')
    } else {
      const postData = {
        title: req.body.title,
        content: req.body.content,
        userId: req.user.id
      }
      await Post.create(postData);
      res.redirect('/posts')
    }
  } ,
  showPostsData: function (req, res) {
    const postsData = [];
    Post.findAll({
      include: [{
        model: User,
        required: false
      }]
    })
      .then((posts) => {
        for (let i = 0; i < posts.length; i++) {
          postsData.push({ id: posts[i].id, title: posts[i].title, content: posts[i].content, postedBy: posts[i].user.name, userId: posts[i].user.id });
        }
        res.render('posts', { userData: req.user, postsData: postsData });
      })
  },
  deletePostData: function (req, res) {
    postId = req.params.id;
    Post.findOne({ where: { id: postId } })
      .then((post) => {
        post.destroy();
        res.redirect('/posts');
      })
  },
  showEditPage: function (req, res) {
    postId = req.params.id;
    Post.findByPk(postId)
    .then(post => {
      const postData = post
      const userData = req.user
      res.render('edit', { postData, userData })
    })
  },
  updatePost: function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      res.redirect('/posts')
    } else {
      const postId = req.params.id;
      Post.findOne({ where: { id: postId } })
        .then(post => {
          post.title = req.body.title,
            post.content = req.body.content,
            post.userId = req.user.id
          post.save();
          res.redirect('/posts')
        })
    }
  }
}