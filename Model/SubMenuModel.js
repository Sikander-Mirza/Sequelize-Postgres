const {DataTypes} = require("sequelize");
const sequelize = require("../infrastructure/db.js")

const SubMenuModel = sequelize.define("SubMenu", {
    SubMenuName: {
      type: DataTypes.STRING, 
    },
    SubMenuUrl: {
      type: DataTypes.STRING, 
    },
    Status:{
    type: DataTypes.ENUM,
    values:[
      "Active","Inactive"
    ]
}
  });
  
  module.exports = SubMenuModel

  