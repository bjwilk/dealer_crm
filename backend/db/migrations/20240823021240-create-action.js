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
    await queryInterface.createTable('Actions', {
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
      report: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      reminder: {
        type: Sequelize.DATEONLY,
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
    options.tableName = 'Actions';
    await queryInterface.dropTable(options);
  },
};
