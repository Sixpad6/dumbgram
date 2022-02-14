'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('followFeeds', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idFollowing: {
        type: Sequelize.INTEGER
      },
      idFeed: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('followFeeds');
  }
};