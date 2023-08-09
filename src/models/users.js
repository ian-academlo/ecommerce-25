'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init({
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    rol: DataTypes.STRING,
    password: DataTypes.STRING,
    profileImage: DataTypes.STRING,
    validEmail: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};