const { Sequelize, DataTypes, where } = require("sequelize");
const sequelize = require("../infrastructure/db.js")


const User = sequelize.define("Customer", {
    firstName: {
      type: DataTypes.STRING, 
    },
    lastName: {
      type: DataTypes.STRING, 
    },
    email: {
      type: DataTypes.STRING, 
      unique: true,
    },
  });
  
  module.exports = User