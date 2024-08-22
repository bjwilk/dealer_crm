"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.Account, {
        foreignKey: 'accountId',
        as: 'account',
        onDelete: 'CASCADE'
      });
    }
  }
  Order.init(
    {
      accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      condition: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
      },
      tax: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: true,
      },
      license: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
      },
      bodies: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
      },
      extras: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Order',
    }
  );
  return Order;
};
