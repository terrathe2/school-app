'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('StudentSubjects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idStudent: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
                      model: "Students",
                      key: "id"
                    }
      },
      idSubject: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
                      model: "Subjects",
                      key: "id"
                    }
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: true,
        default: 0
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
    return queryInterface.dropTable('StudentSubjects');
  }
};
