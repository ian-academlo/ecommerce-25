"use strict";
const { faker } = require("@faker-js/faker");

const randomProduct = () => {
  const today = new Date();
  const name = faker.commerce.productName();
  const price = Number(faker.commerce.price({ min: 49, dec: 2 }));
  const description = faker.commerce.productDescription();
  const availableQty = faker.number.int({ max: 100 });
  const userId = faker.number.int({ min: 1, max: 10 });
  const productImage = faker.image.url({ category: name });
  const createdAt = today.toISOString();
  const updatedAt = today.toISOString();

  return {
    name,
    price,
    description,
    availableQty,
    userId,
    productImage,
    createdAt,
    updatedAt,
  };
};

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const arr = Array.from({ length: 100 }, () => 1);

    const products = arr.map((item) => randomProduct());

    await queryInterface.bulkInsert("Products", products);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     *
     */
    await queryInterface.bulkDelete("Products", null, {});
  },
};
