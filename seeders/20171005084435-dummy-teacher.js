'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Teachers',[
      {
        firstName: "Bambang",
        lastName: "Suprapto",
        email: "bambangsuprapto@sekolah.id",
        idSubject: null
      },
      {
        firstName: "Rukmana",
        lastName: "Fatmawati",
        email: "rukmanafatmawati@sekolah.id",
        idSubject: null
      },
      {
        firstName: "Butet",
        lastName: "Naiborhu",
        email: "butetnaiborhu@sekolah.id",
        idSubject: null
      },
      {
        firstName: "Yulius",
        lastName: "Prawiranegara",
        email: "yuliusprawiranegara@sekolah.id",
        idSubject: 4
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Teachers", null, {});
  }
};
