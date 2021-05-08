const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  const userModel = sequelize.define(
    'users',
    {
      id: {
        field: 'id',
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        field: 'name',
        type: DataTypes.STRING
      },
      email: {
        field: 'email',
        type: DataTypes.STRING
      },
      password: {
        field: 'password',
        type: DataTypes.STRING
      },
    }
  );
  return userModel
} 