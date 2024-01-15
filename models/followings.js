"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Followings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Followings.init(
    {
      followedId: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      followerId: {
        type: DataTypes.BIGINT,
      },
      followingId: {
        type: DataTypes.BIGINT,
      },
      followedAt: {
        type: DataTypes.DATE,
      },
      createdAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Followings",
    }
  );
  return Followings;
};
