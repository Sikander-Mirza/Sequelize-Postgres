const { DataTypes } = require('sequelize');
const sequelize = require('../infrastructure/db.js');
const NotaryFileModel = sequelize.define('FileNotary', {
  Id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
    fileName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fileData: {
    type: DataTypes.BLOB,
    allowNull: false,
  },
  fileType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
});


module.exports = NotaryFileModel;
