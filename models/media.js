'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class media extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  media.init({
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER,
    media: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'media',
  });

  // media.associate = function (models) {
  //   media.belongsTo(models.users, {
  //     as: 'users',
  //     foreignKey: 'user_id'
  //   });

  //   media.belongsTo(models.posts, {
  //     as: 'posts',
  //     foreignKey: 'post_id'
  //   });
  // }
  return media;
};