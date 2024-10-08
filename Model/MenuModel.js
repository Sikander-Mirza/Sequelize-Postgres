const {DataTypes} = require("sequelize");
const sequelize = require("../infrastructure/db.js")

const MenuModel = sequelize.define("Menu", {
    MenuName: {
      type: DataTypes.STRING, 
    },
    MenuIcon: {
      type: DataTypes.STRING, 
    },
    MenuUrl: {
      type: DataTypes.STRING, 
    },
    Status:{
    type: DataTypes.ENUM,
    values:[
      "Active","Inactive"
    ]
}
  });
  
  module.exports = MenuModel

  