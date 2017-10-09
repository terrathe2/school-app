'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        username: "johndoe",
        password: "982d953f572cfa9c88a575ac1bbb6863",
        role: "teacher",
        secret: "hacktiv8"
      },
      {
        username: "pakdengklek",
        password: "26fbc37a856bbe26b319031b62c7311f",
        role: "academic",
        secret: "diablosa"
      },
      {
        username: "charlesxavier",
        password: "b545843ec06b9534afc88bd2f86732c4",
        role: "headmaster",
        secret: "heiworld"
      }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
