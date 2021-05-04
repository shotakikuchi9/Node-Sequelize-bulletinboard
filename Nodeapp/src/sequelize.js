const { Sequelize } = require('sequelize');
const postModel = require('./models/post');
const userModel = require('./models/user');
require('dotenv').config();
const env = process.env
const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASS, {
  host: 'mysql',
  port:3306,
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

User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' }, { targetKey: 'id' });

module.exports = {
  Post,
  User
}
