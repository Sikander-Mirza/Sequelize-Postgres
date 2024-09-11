const {DataTypes} = require("sequelize");
const sequelize = require("../infrastructure/db.js")

const User = sequelize.define("Customer", {
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
  
  module.exports = User

  