"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Action extends Model {
    static associate(models) {
      Action.belongsTo(models.Account, {
        foreignKey: 'accountId',
        as: 'account',
        onDelete: 'CASCADE'
      });
    }
  }
  Action.init(
    {
      accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      report: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      details: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      reminder: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      }
    },
    {
      sequelize,
      modelName: 'Action',
    }
  );
  return Action;
};
