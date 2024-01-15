"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Medias", {
      id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      index: {
        type: Sequelize.INTEGER,
      },
      postedId: {
        type: Sequelize.BIGINT,
      },
      url: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.ENUM("image", "video", "gif"),
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Medias");
  },
};
