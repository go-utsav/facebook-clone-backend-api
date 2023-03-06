"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  comments.init(
    {
      caption: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      post_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "comments",
    }
  );

  comments.associate = function (models) {
    // define association here
    comments.belongsTo(models.posts, {
      as: 'commentpost',
      foreignKey: 'post_id',
    });

    comments.belongsTo(models.users, {
      as: 'commentuser',
      foreignKey: 'user_id',
    })
  }

  return comments;
};
