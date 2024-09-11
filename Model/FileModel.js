const { DataTypes } = require('sequelize');
const sequelize = require('../infrastructure/db.js');
const Sequelize = require("sequelize")
const FileModel = sequelize.define('File', {

    fileName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fileData: {
        type: Sequelize.BLOB, 
        allowNull: false
    },
    fileType: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true 
});

module.exports = FileModel;
