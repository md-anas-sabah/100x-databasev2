"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Posts", {
      id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT,
      },
      type: {
        allowNull: true,
        type: Sequelize.ENUM("repost", "post", "reply"),
        defaultValue: "post",
      },
      referenceId: {
        allowNull: true,
        type: Sequelize.BIGINT,
        References: {
          model: "Posts",
          key: "id",
        },
      },
      userId: {
        type: Sequelize.BIGINT,
        allowNull: true,
        references: {
          model: "Users",
          key: "id",
        },
      },
      content: {
        type: Sequelize.STRING(280),
        allowNull: true,
      },
      postedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: true,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Posts");
  },
};
