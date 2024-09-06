const { Sequelize, DataTypes, where } = require("sequelize");


const sequelize = new Sequelize("item_master", "postgres", "admin", {
    host: "localhost",
    dialect: "postgres",
    port: 5432,
  });

  module.exports = sequelize;