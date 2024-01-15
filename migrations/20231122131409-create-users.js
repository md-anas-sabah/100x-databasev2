"use strict";
/** @type {import('sequelize-cli').Migration} */

const { sequelize } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      username: {
        allowNull: true,
        type: Sequelize.STRING(50),
        unique: true,
      },
      displayName: {
        allowNull: true,
        type: Sequelize.STRING(50),
      },
      email: {
        allowNull: true,
        type: Sequelize.STRING(120),
        unique: true,
      },
      location: {
        allowNull: true,
        type: Sequelize.STRING(100),
      },
      bio: {
        allowNull: true,
        type: Sequelize.TEXT(200),
      },
      website: {
        allowNull: true,
        type: Sequelize.STRING(100),
      },
      dateOfBirth: {
        allowNull: true,
        type: Sequelize.DATE,
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
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      password: {
        type: Sequelize.STRING(256),
        allowNull: true,
      },
      profilePicUrl: {
        type: Sequelize.STRING(1024),
        allowNull: true,
      },
      headerPicUrl: {
        type: Sequelize.STRING(1024),
        allowNull: true,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
