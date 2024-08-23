"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    static associate(models) {
      Account.belongsTo(models.User, {
        foreignKey: 'ownerId',
        as: 'Owner',
        onDelete: 'CASCADE'
      });

      Account.hasMany(models.Order, {
        foreignKey: 'accountId',
        as: 'orders'
      })
    }
  }
  Account.init(
    {
      ownerId: {
        type: DataTypes.INTEGER,
      },
      companyName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      businessType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fleetSize: {
        type: DataTypes.INTEGER,
      },
      lookingFor: {
        type: DataTypes.STRING,
      },
      equipmentType: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      zipCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      notes: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Account',
    }
  );
  return Account;
};
