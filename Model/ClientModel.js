const { DataTypes } = require("sequelize");
const sequelize = require("../infrastructure/db.js");

const ClientModel = sequelize.define("Client", {

    titleCompany: {
        type: DataTypes.ENUM, 
        values: [
          'Test Company', 'Deer Creek Title', 'Test Title 3'], 
        allowNull: false, 
      },
  ClosingType: {
    type: DataTypes.ENUM, 
    values: ['title closing buyser side', 'title closing buyser side with loans', 'title closing seller side', 'single document'], 
    allowNull: false, 
  },
  InternalReference: {
    type: DataTypes.STRING,
    unique: true,
  },
  KBA: {
    type: DataTypes.BOOLEAN,
  },
  AddressOne: {
    type: DataTypes.STRING,
  },
  AddressTwo: {
    type: DataTypes.STRING,
  },
  City: {
    type: DataTypes.STRING,
  },
  State: {
    type: DataTypes.STRING,
  },
  ZipCode: {
    type: DataTypes.STRING, 
  },
  Price: {
    type: DataTypes.FLOAT, 
  },
});

module.exports = ClientModel;
