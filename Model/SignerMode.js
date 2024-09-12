const { DataTypes } = require("sequelize");
const sequelize = require("../infrastructure/db.js");
const ClientModel = require('./ClientModel'); // Import the ClientModel to create associations

const SignerModel = sequelize.define("Signer", {
  SignerName: {
    type: DataTypes.STRING, 
  },
  SignerEmail: {
    type: DataTypes.STRING, 
    unique: true,
  },
  PhoneNumber: {
    type: DataTypes.STRING,
  },
  Role: {
    type: DataTypes.ENUM,
    values: ["Signer", "Witness", "Observer"]
  },
  clientId: {  // Foreign key reference to Client
    type: DataTypes.INTEGER,
    references: {
      model: ClientModel,
      key: 'id'
    },
    allowNull: false,  // Ensure that every signer is linked to a client
    onDelete: 'CASCADE'  // Optional: cascade delete if the client is deleted
  }
});

module.exports = SignerModel;
