'use strict';

const { faker } = require('@faker-js/faker');
const products = [];
for (let i = 0; i < 10; i++) {
  products.push({
    available: true,
    name: faker.commerce.product(),
    price: faker.commerce.price({ min: 1, max: 1000 }),
    image: faker.image.dataUri(),
    description: faker.commerce.productDescription(),
    stock: 100,
    SellerId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', products, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  }
};
