'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Teachers',[
      {
        firstName: "Bambang",
        lastName: "Suprapto",
        email: "bambangsuprapto@sekolah.id"
      },
      {
        firstName: "Rukmana",
        lastName: "Fatmawati",
        email: "rukmanafatmawati@sekolah.id"
      },
      {
        firstName: "Butet",
        lastName: "Naiborhu",
        email: "butetnaiborhu@sekolah.id"
      },
      {
        firstName: "Yulius",
        lastName: "Prawiranegara",
        email: "yuliusprawiranegara@sekolah.id"
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Teachers", null, {});
  }
};
