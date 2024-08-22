"use strict";
const { Order } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
// if (process.env.NODE_ENV === "production") {
//   options.schema = process.env.SCHEMA;
// }

const orderData = [
  {
    accountId: 1,
    vin: "1FTFW1EF1EKF12345",
    model: "International",
    year: 2015,
    condition: 'Used',
    price: 75000,
    tax: 9.75,
    license: 1500,
    bodies: 22000,
    extras: 12500,
    notes: "5yd dump body installed by vendor"
  },
  {
    accountId: 1,
    vin: "1FTFW1EF1EKF67890",
    model: "International",
    year: 2016,
    condition: 'Used',
    price: 82000,
    tax: 9.5,
    license: 1800,
    bodies: 22000,
    extras: 11500

  },
  {
    accountId: 3,
    vin: "1FTFW1EF1EKF11223",
    model: "International",
    year: 2017,
    condition: 'Used',
    price: 95000,
    tax: 10.75,
    license: 1200,
    bodies: 22000
  },
  {
    accountId: 4,
    companyName: "Company 4",
    vin: "1FTFW1EF1EKF33445",
    model: "International",
    year: 2018,
    condition: 'Used',
    price: 105000,
    tax: 8.75,
    license: 2000,
    bodies: 22000
  },
  {
    accountId: 5,
    vin: "1FTFW1EF1EKF55667",
    model: "International",
    year: 2019,
    condition: 'Used',
    price: 120000,
    tax: 10,
    license: 1400,
    bodies: 22000

  },
  {
    accountId: 5,
    vin: "1FTFW1EF1EKF77889",
    model: "International",
    year: 2020,
    condition: 'Used',
    price: 135000,
    tax: 9,
    license: 2300,
    bodies: 22000

  },
  {
    accountId: 7,
    companyName: "Company 7",
    vin: "1FTFW1EF1EKF99112",
    model: "International",
    year: 2024,
    condition: 'New',
    price: 150000,
    tax: 9,
    license: 1700,
    bodies: 22000

  },
  {
    accountId: 8,
    vin: "1FTFW1EF1EKF21334",
    model: "International",
    year: 2024,
    condition: 'New',
    price: 165000,
    tax: 10,
    license: 2200,
    bodies: 22000

  },
  {
    accountId: 9,
    vin: "1FTFW1EF1EKF43556",
    model: "International",
    year: 2024,
    condition: 'New',
    price: 180000,
    tax: 9,
    license: 2500,
    bodies: 22000

  },
  {
    accountId: 9,
    vin: "1FTFW1EF1EKF65778",
    model: "International",
    year: 2024,
    condition: 'New',
    price: 195000,
    tax: 10,
    license: 2000,
    bodies: 22000

  },
];


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Order.bulkCreate(orderData, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Orders'
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      accountId: { [Op.in]: [ 1, 3, 4, 5, 7, 8, 9] }
    ,}, {});  }
};
