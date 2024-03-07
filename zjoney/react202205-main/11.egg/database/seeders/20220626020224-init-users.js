'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        name: 'tom',
        age: 3,
        created: new Date(),
        updated: new Date()
      },
      {
        name: 'jerry',
        age: 4,
        created: new Date(),
        updated: new Date()
      }], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
