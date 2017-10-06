'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      "Teachers",
      "idSubject", {
                    type: Sequelize.INTEGER,
                    allowNull: true,
                    references: {
                                  model: "Subjects",
                                  key: "id"
                                }
                    }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      "Teachers",
      "idSubject"
    )
  }
};
