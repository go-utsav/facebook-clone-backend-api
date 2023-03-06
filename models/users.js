"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init(
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      mobileno: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "users",
    }
  );

  users.associate = function (models) {
    users.hasMany(models.posts, {
      foreignKey: "user_id",
      as: 'post'
    });

    users.hasMany(models.comments, {
      as: 'usercomment',
      foreignKey: 'user_id'
    });

    // users.hasOne(models.likes, {
    //   as: 'userlike',
    //   foreignKey: 'user_id'
    // })

    // users.hasOne(models.media, {
    //   as: 'usermedia',
    //   foreignKey: 'user_id'
    // })
  }
  return users;
};
