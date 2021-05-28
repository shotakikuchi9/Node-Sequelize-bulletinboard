const { Post, User, Like } = require('../sequelize')
const { check, validationResult } = require('express-validator');
const like = require('../models/like');
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
  },
  showPostsData: function (req, res) {
    const postsData = [];
    Post.findAll({
      order: [['id', 'ASC']],
      include: [{
        model: User,
        required: false
      }]
    })
    .then(async (posts) => {
      for (let i = 0; i < posts.length; i++) {
        await Like.findAll({ where: { postId: posts[i].id }})
        .then((likes) => {
          const likeCount = likes.length
          const likeUsers = [];
          for (let i = 0; i < likes.length; i++) {
            likeUsers.push(likes[i].userId)
          }
          postsData.push({ id: posts[i].id, title: posts[i].title, content: posts[i].content, postedBy: posts[i].user.name, userId: posts[i].user.id, likeCount: likeCount, likeUsers: likeUsers });
        })
      }    
      console.log(postsData);
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
  },
  likePost: async function (req, res) {
    const liked = await Like.findOne({
      where: {
        postId: req.params.id,
        userId: req.user.id,
      }
    });
    if (liked) {
      liked.destroy();
    } else {
      await Like.create({
        userId: req.user.id,
        postId: req.params.id
      })
    }
    res.redirect('/posts')
  }
}