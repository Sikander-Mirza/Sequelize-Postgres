const { DataTypes } = require('sequelize');
const sequelize = require('../infrastructure/db.js');
const ClientModel = require('./ClientModel'); // Import the ClientModel to create associations

const FileModel = sequelize.define('File', {
  fileName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fileData: {
    type: DataTypes.BLOB, 
    allowNull: false
  },
  fileType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  clientId: {  // Foreign key reference to Client
    type: DataTypes.INTEGER,
    references: {
      model: ClientModel,
      key: 'id'
    },
    allowNull: false,
    onDelete: 'CASCADE'
  }
}, {
  timestamps: true 
});

module.exports = FileModel;
