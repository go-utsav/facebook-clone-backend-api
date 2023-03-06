'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  likes.init({
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'likes',
  });

  // likes.associate = function (models) {

  //   likes.hasOne(models.users, {
  //     as: 'user',
  //     foreignKeys: 'user_id',
  //   });

  //   likes.hasOne(models.posts, {
  //     as: 'post',
  //     foreignKeys: 'post_id'
  //   });
  // }

  return likes;
};