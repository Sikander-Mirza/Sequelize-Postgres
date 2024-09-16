const { DataTypes } = require('sequelize');
const sequelize = require('../infrastructure/db.js');

const NotaryInfo = sequelize.define('NotaryInfo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: true,
  },

}, {
  timestamps: true,
});

// Define the association

module.exports = NotaryInfo;
