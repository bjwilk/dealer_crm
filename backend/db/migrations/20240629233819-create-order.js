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
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      accountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      vin: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      model: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      },
      tax: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: true,
      },
      license: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: true,
      },
      bodies: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: true,
      },
      extras: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: true,
      },
      condition: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    }, options);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Orders';
    await queryInterface.dropTable(options);
  },
};
