const {DataTypes} = require("sequelize");
const sequelize = require("../infrastructure/db.js")

const ServiceModel = sequelize.define("Services", {
    ServiceName: {
      type: DataTypes.STRING, 
    },
    ServicePrice: {
      type: DataTypes.STRING, 
    },
    Status:{
        type: DataTypes.ENUM,
        values:[
          "Active","Inactive"
        ]
    }
  });
  
  module.exports = ServiceModel

  