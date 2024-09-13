const { DataTypes } = require('sequelize');
const sequelize = require('../infrastructure/db.js');
const NotaryInfo = require('./NotaryModel');

const NotaryFileModel = sequelize.define('FileNotary', {
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
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
});

// Define association
NotaryFileModel.belongsTo(NotaryInfo, { foreignKey: 'notaryInfoId' });

module.exports = NotaryFileModel;
