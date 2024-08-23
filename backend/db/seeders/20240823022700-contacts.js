"use strict";
const { Contact } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
// if (process.env.NODE_ENV === "production") {
//   options.schema = process.env.SCHEMA;
// }

const contactData = [
  {
    accountId: 1,
    name: "John Doe",
    position: "Operations Manager",
    phone: '555-555-5551',
    email: 'johndoe@gmail.com',
  },
  {
    accountId: 2,
    name: "Jane Smith",
    position: "Sales Director",
    phone: '555-555-5552',
    email: 'janesmith@gmail.com',
  },
  {
    accountId: 3,
    name: "Michael Johnson",
    position: "Marketing Specialist",
    phone: '555-555-5553',
    email: 'michaeljohnson@gmail.com',
  },
  {
    accountId: 4,
    name: "Emily Davis",
    position: "HR Coordinator",
    phone: '555-555-5554',
    email: 'emilydavis@gmail.com',
  },
  {
    accountId: 5,
    name: "David Brown",
    position: "Finance Analyst",
    phone: '555-555-5555',
    email: 'davidbrown@gmail.com',
  },
  {
    accountId: 6,
    name: "Sarah Wilson",
    position: "Product Manager",
    phone: '555-555-5556',
    email: 'sarahwilson@gmail.com',
  },
  {
    accountId: 7,
    name: "Chris Taylor",
    position: "IT Support",
    phone: '555-555-5557',
    email: 'christaylor@gmail.com',
  },
  {
    accountId: 8,
    name: "Amanda Miller",
    position: "Customer Service Representative",
    phone: '555-555-5558',
    email: 'amandamiller@gmail.com',
  },
  {
    accountId: 9,
    name: "Daniel Garcia",
    position: "Legal Advisor",
    phone: '555-555-5559',
    email: 'danielgarcia@gmail.com',
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Contact.bulkCreate(contactData, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Contacts'
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      accountId: { [Op.in]: [ 1, 3, 4, 5, 7, 8, 9] }
    ,}, {});  }
};
