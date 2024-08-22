'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}
// if (process.env.NODE_ENV === "production") {
//   options.schema = process.env.SCHEMA;
// }

module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'demo1@user.io',
        username: 'FakerUser1',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user11@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user22@user.io',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], { validate: true, });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: [ 'FakeUser1', 'FakeUser2', 'FakeUser3'] }
    ,}, {});
  }
};
