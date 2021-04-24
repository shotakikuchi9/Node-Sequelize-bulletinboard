const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const postModel = sequelize.define(
    'posts',
    {
      id: {
        field: 'id',
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        field: 'title',
        type: DataTypes.STRING
      },
      content: {
        field: 'content',
        type: DataTypes.STRING
      }
    }
  )
  return postModel
};

