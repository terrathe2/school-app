'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Teachers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        default: new Date()
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        default: new Date()
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Teachers');
  }
};
