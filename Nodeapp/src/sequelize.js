const { Sequelize } = require('sequelize');
const postModel = require('./models/post');
const userModel = require('./models/user');
const likeModel = require('./models/like');

require('dotenv').config();
const env = process.env
const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {
  host: 'mysql',
  port: 3306,
  dialect: 'mysql'
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
(async () => await sequelize.sync({ alter: true }))();

const User = userModel(sequelize);
const Post = postModel(sequelize);
const Like = likeModel(sequelize);

User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' }, { targetKey: 'id' });
User.belongsToMany(Post, { through: Like, foreignKey: 'postId' }, { targetKey: 'id' });
Post.belongsToMany(User, { through: Like, foreignKey: 'userId' }, { targetKey: 'id' });
// User.belongsToMany(Post, { as: 'like_posts', through: Like } );
// Post.belongsToMany(User, { as: 'liked_by', through: Like } );

module.exports = {
  Post,
  User,
  Like
}
