'use strict';
const {Model} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.address, {
        foreignKey:"user_id",
        onDelete:"CASCADE"
      });
      User.hasOne(models.userToken);
    }
  }
  User.init({
    username: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    mobile: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(async function(user){
    try {
        const salt = 10;
        const hashedpassword = await bcrypt.hash(user.password, salt);
        user.password = hashedpassword
    } catch (error) {
      console.log(error)
    } 
  });
  return User;
};