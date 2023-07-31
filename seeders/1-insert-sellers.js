'use strict';

/** @type {import('sequelize-cli').Migration} */

const sellers = [];
sellers.push({
  username: 'seller001',
  password: 'titaner',
  createdAt: new Date(),
  updatedAt: new Date(),
})

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Sellers', sellers, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Sellers', null, {});
  }
};
