'use strict';

/** @type {import('sequelize-cli').Migration} */

const buyers = [];
buyers.push({
  username: 'buyer001',
  password: 'titaner',
  createdAt: new Date(),
  updatedAt: new Date(),
})

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Buyers', buyers, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Buyers', null, {});
  }
};
