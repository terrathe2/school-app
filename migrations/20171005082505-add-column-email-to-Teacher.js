'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
        'Teachers',
        'email',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Teachers',
      'email'
    )
  }
};
