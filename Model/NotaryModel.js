const { DataTypes } = require("sequelize");
const sequelize = require("../infrastructure/db.js");

const NotaryInfo = sequelize.define(
  "NotaryInfo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Name:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    signature: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    initials: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // ... other fields ...
  },
  {
    timestamps: true,
  }
);

module.exports = NotaryInfo;
