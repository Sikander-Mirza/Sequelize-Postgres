const {DataTypes} = require("sequelize");
const sequelize = require("../infrastructure/db.js")

const SignerModel = sequelize.define("Signer", {
    SignerName: {
      type: DataTypes.STRING, 
    },

    SignerEmail: {
      type: DataTypes.STRING, 
      unique: true,
    },
    PhoneNumber:{
      type: DataTypes.STRING,
    },
    ROle:{
      type: DataTypes.ENUM,
      values:[
        "Signer","Witness","Observer"
      ]
    }
  });
  
  module.exports = SignerModel;

  