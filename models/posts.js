"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  posts.init(
    {
      title: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "posts",
    }
  );

  posts.associate = function (models) {
    // define association here
    posts.belongsTo(models.users, {
      foreignKey: 'user_id',
      as: 'user'
    });
    posts.hasMany(models.comments, {
      as: 'postcomment',
      foreignKey: 'post_id',
    });


    // posts.belongsTo(models.likes, {
    //   as: 'postlike',
    //   foreignKey: 'post_id',
    // });

    // posts.belongsTo(models.media, {
    //   as: 'postmedia',
    //   foreignKey: 'post_id',
    // });
  }
  return posts;
};
