"use strict";
/** @type {import('sequelize-cli').Migration} */

const { sequelize } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      username: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
      },
      displayName: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(120),
        unique: true,
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      bio: {
        type: Sequelize.TEXT(200),
        allowNull: false,
      },
      website: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      dateOfBirth: {
        type: Sequelize.DATE,
        allowNull: false,
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
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      password: {
        type: Sequelize.STRING(256),
        allowNull: false,
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
