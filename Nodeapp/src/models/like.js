const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const likeModel = sequelize.define(
    'likes',
    {
      id: {
        field: 'id',
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }
    }
  );
  return likeModel
} 