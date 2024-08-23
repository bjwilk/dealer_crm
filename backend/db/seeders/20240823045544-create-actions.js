"use strict";
const { Action } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
// if (process.env.NODE_ENV === "production") {
//   options.schema = process.env.SCHEMA;
// }

const actionData = [
  {
    accountId: 1,
    report: "Complete the initial project analysis.",
    details: "Contact project manager to discuss truck needs for new construction job.",
    reminder: "2024-08-30",
  },
  {
    accountId: 2,
    report: "Follow up with the client regarding the feedback.",
    details: "Contact project manager to discuss truck needs for new construction job.",
    reminder: "2024-09-01",
  },
  {
    accountId: 3,
    report: "Finalize the design specifications.",
    details: "Contact project manager to discuss truck needs for new construction job.",
    reminder: "2024-09-05",
  },
  {
    accountId: 4,
    report: "Review the budget and resource allocation.",
    details: "Contact project manager to discuss truck needs for new construction job.",
    reminder: "2024-09-10",
  },
  {
    accountId: 5,
    report: "Call client to discuss next year purchases.",
    details: "Contact project manager to discuss truck needs for new construction job.",
    reminder: "2024-09-15",
  },
  {
    accountId: 6,
    report: "Update the project timeline and milestones.",
    details: "Contact project manager to discuss truck needs for new construction job.",
    reminder: "2024-09-20",
  },
  {
    accountId: 7,
    report: "Prepare the draft report for client presentation.",
    details: "Contact project manager to discuss truck needs for new construction job.",
    reminder: "2024-09-25",
  },
  {
    accountId: 8,
    report: "Review the legal documents for compliance.",
    details: "Contact project manager to discuss truck needs for new construction job.",
    reminder: "2024-09-28",
  },
  {
    accountId: 9,
    report: "Follow up with customer on recent purchase.",
    details: "Contact project manager to discuss truck needs for new construction job.",
    reminder: "2024-10-02",
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Action.bulkCreate(actionData, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Actions'
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      accountId: { [Op.in]: [ 1, 3, 4, 5, 7, 8, 9] }
    ,}, {});  }
};