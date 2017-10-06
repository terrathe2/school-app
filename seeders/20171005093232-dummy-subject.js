'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Subjects", [
      {
        subjectName: "Kimia"
      },
      {
        subjectName: "Ekonomi"
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Subjects", null, {});
  }
};
