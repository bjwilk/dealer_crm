"use strict";
const { Account } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
// if (process.env.NODE_ENV === "production") {
//   options.schema = process.env.SCHEMA;
// }

const accountData = [
  {
    ownerId: 1,
    companyName: "Company 1",
    businessType: "Construction",
    fleetSize: 5,
    lookingFor: "Dump Truck",
    equipmentType: "Dump Truck",
    email: "abc@user.io",
    phoneNumber: 555-555-5555,
    address: "123 Main Street",
    city: "Example City",
    state: "CA",
    zipCode: 94611,
  },
  {
    ownerId: 1,
    companyName: "Company 2",
    businessType: "Landscaping",
    fleetSize: 2,
    lookingFor: "Water Truck",
    equipmentType: "Flatbed",
    email: "flower@user.io",
    phoneNumber: 555-555-5555,
    address: "456 Oak Avenue",
    city: "Example City",
    state: "CA",
    zipCode: 94611,
  },
  {
    ownerId: 1,
    companyName: "Company 3",
    businessType: "Transport",
    fleetSize: 2,
    lookingFor: "Sleeper",
    equipmentType: "Sleeper",
    email: "hauling@user.io",
    phoneNumber: 555-555-5555,
    address: "789 Pine Road",
    city: "Example City",
    state: "CA",
    zipCode: 94611,
  },
  {
    ownerId: 1,
    companyName: "Company 4",
    businessType: "Logistics",
    fleetSize: 10,
    lookingFor: "Flatbed",
    equipmentType: "Flatbed",
    email: "logistics@user.io",
    phoneNumber: 555-555-5555,
    address: "321 Elm Street",
    city: "Example City",
    state: "CA",
    zipCode: 94611,
  },
  {
    ownerId: 1,
    companyName: "Company 5",
    businessType: "Agriculture",
    fleetSize: 3,
    lookingFor: "Tractor",
    equipmentType: "Tractor",
    email: "farm@user.io",
    phoneNumber: 555-555-5555,
    address: "654 Maple Avenue",
    city: "Example City",
    state: "CA",
    zipCode: 94611,
  },
  {
    ownerId: 1,
    companyName: "Company 6",
    businessType: "Construction",
    fleetSize: 7,
    lookingFor: "Excavator",
    equipmentType: "Excavator",
    email: "build@user.io",
    phoneNumber: 555-555-5555,
    address: "987 Cedar Road",
    city: "Example City",
    state: "CA",
    zipCode: 94611,
  },
  {
    ownerId: 1,
    companyName: "Company 7",
    businessType: "Mining",
    fleetSize: 6,
    lookingFor: "Loader",
    equipmentType: "Loader",
    email: "mining@user.io",
    phoneNumber: 555-555-5555,
    address: "123 Birch Lane",
    city: "Example City",
    state: "CA",
    zipCode: 94611,
  },
  {
    ownerId: 1,
    companyName: "Company 8",
    businessType: "Forestry",
    fleetSize: 4,
    lookingFor: "Skidder",
    equipmentType: "Skidder",
    email: "trees@user.io",
    phoneNumber: 555-555-5555,
    address: "456 Spruce Street",
    city: "Example City",
    state: "CA",
    zipCode: 94611,
  },
  {
    ownerId: 1,
    companyName: "Company 9",
    businessType: "Delivery",
    fleetSize: 8,
    lookingFor: "Box Truck",
    equipmentType: "Box Truck",
    email: "deliver@user.io",
    phoneNumber: 555-555-5555,
    address: "789 Redwood Road",
    city: "Example City",
    state: "CA",
    zipCode: 94611,
  },
  {
    ownerId: 1,
    companyName: "Company 10",
    businessType: "Waste Management",
    fleetSize: 5,
    lookingFor: "Garbage Truck",
    equipmentType: "Garbage Truck",
    email: "waste@user.io",
    phoneNumber: 555-555-5555,
    address: "321 Cypress Avenue",
    city: "Example City",
    state: "CA",
    zipCode: 94611,
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Account.bulkCreate(accountData, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Accounts'
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [ 1, 2, 3] }
    ,}, {});  }
};
