"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstname: {
        type: Sequelize.STRING(30),
      },
      lastname: {
        type: Sequelize.STRING(30),
      },
      username: {
        type: Sequelize.STRING(30),
        unique: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      rol: {
        type: Sequelize.STRING,
        defaultValue: "member",
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%-^&*])[A-Za-z\d!@#$%-^&*]{8,}$/,
        },
      },
      profileImage: {
        type: Sequelize.STRING,
        validate: {
          isUrl: true,
        },
      },
      validEmail: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
