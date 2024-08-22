"use strict";

let options = {};
// if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
// }
// if (process.env.NODE_ENV === "production") {
//   options.schema = process.env.SCHEMA;
// }

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ownerId: {
        type: Sequelize.INTEGER,
      },
      companyName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      businessType: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fleetSize: {
        type: Sequelize.INTEGER,
      },
      lookingFor: {
        type: Sequelize.STRING,
      },
      equipmentType: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      zipCode: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      notes: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Accounts';
    await queryInterface.dropTable(options);
  },
};
