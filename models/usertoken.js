'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      userToken.belongsTo(models.User, {
        foreignKey: "user_id",
        onDelete:"CASCADE"
      });
    }
  }
  userToken.init({
    user_id: DataTypes.INTEGER,
    token: DataTypes.STRING,
    expiry: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'userToken',
  });
  return userToken;
};