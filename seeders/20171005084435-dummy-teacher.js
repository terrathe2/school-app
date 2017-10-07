'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Teachers',[
      {
        firstName: "Bambang",
        lastName: "Suprapto",
        email: "bambangsuprapto@sekolah.id",
        idSubject: 1
      },
      {
        firstName: "Rukmana",
        lastName: "Fatmawati",
        email: "rukmanafatmawati@sekolah.id",
        idSubject: 2
      },
      {
        firstName: "Butet",
        lastName: "Naiborhu",
        email: "butetnaiborhu@sekolah.id",
        idSubject: 1
      },
      {
        firstName: "Yulius",
        lastName: "Prawiranegara",
        email: "yuliusprawiranegara@sekolah.id",
        idSubject: 2
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Teachers", null, {});
  }
};
