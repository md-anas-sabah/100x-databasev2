"use strict";
const { Model } = require("sequelize");
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
  Users.init(
    {
      id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.BIGINT,
      },
      username: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: true,
      },
      displayName: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(120),
        unique: true,
        allowNull: true,
      },
      location: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      bio: {
        type: DataTypes.TEXT(200),
        allowNull: true,
      },
      website: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          isAbove13(value) {
            const today = new Date();
            const userBirthDate = new Date(value);
            const ageDiff = today.getFullYear() - userBirthDate.getFullYear();

            if (ageDiff < 13) {
              throw new Error("User must be at least 13 years old.");
            }
          },
        },
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: true,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      password: {
        type: DataTypes.STRING(256),
        allowNull: true,
      },
      profilePicUrl: {
        type: DataTypes.STRING(1024),
        allowNull: true,
      },
      headerPicUrl: {
        type: DataTypes.STRING(1024),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
