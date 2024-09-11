const { Model, DataTypes } = require('sequelize');
const sequelize = require('../infrastructure/db.js');

class UserManagement extends Model {}

UserManagement.init({
  userName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  emailAddress: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  },
  privileges: {
    type: DataTypes.JSONB, // JSONB to store a JSON object directly in PostgreSQL
    allowNull: false,
    defaultValue: {  // Default values for the privileges object
      dashboard: false,
      notaryDashboard: false,
      jobManagement: {
        notarizeADocument: false,
        jobsList: false
      },
      titleCompany: false,
      notaryManagement: false,
      userManagement: false,
      services: false,
      clientManagement: false,
      menuManagement: false,
      notarizationLogs: false
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize, // Pass the `sequelize` instance
  modelName: 'UserManagement',
  tableName: 'UserManagements', // Explicit table name if pluralization is not desired
  timestamps: true, // Enable createdAt and updatedAt fields
  hooks: {
    beforeUpdate: (user) => { // Pre-save hook to update 'updatedAt'
      user.updatedAt = new Date();
    }
  }
});

module.exports = UserManagement;
