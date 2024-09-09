const {DataTypes} = require("sequelize");
const sequelize = require("../infrastructure/db.js")



const ScheduleModel = sequelize.define("Schedule", {
    JobDate: {
      type: DataTypes.DATE, 
    },

    AssigningOption: {
      type: DataTypes.ENUM, 
      values:[
        'Preferred Notary','Random Notary'      ]
    },
    SpecificNotary:{
      type: DataTypes.ENUM,
      values:[
        'Muhammad Umer','Andrew Ray Yon','Vanessa McCarsky','Dalarrian featherston','Susan Karen Oliveira ','Patricia Arnaiz Chipoco','Brian Lehman','Peta-Gaye Anderson','Christopher Yon','Umer Notary','Umer Testing notary'
      ]
    },

    ScheduleTime:{
      type: DataTypes.ENUM,
      values:[  
        '08:00 AM - 08:30 AM',
        '08:30 AM - 09:00 AM',
        '09:00 AM - 09:30 AM',
        '09:30 AM - 10:00 AM',
        '10:00 AM - 10:30 AM',
        '10:30 AM - 11:00 AM',
        '11:00 AM - 11:30 AM',
        '11:30 AM - 12:00 PM',
    
        // Afternoon
        '12:00 PM - 12:30 PM',
        '12:30 PM - 01:00 PM',
        '01:00 PM - 01:30 PM',
        '01:30 PM - 02:00 PM',
        '02:00 PM - 02:30 PM',
        '02:30 PM - 03:00 PM',
    
        // Evening
        '03:00 PM - 03:30 PM',
        '03:30 PM - 04:00 PM',
        '04:00 PM - 04:30 PM',
        '04:30 PM - 05:00 PM',
        '05:00 PM - 05:30 PM',
        '05:30 PM - 06:00 PM',
    
        // Late Evening
        '06:00 PM - 06:30 PM',
        '06:30 PM - 07:00 PM',
        '07:00 PM - 07:30 PM',
        '07:30 PM - 08:00 PM',
        '08:00 PM - 08:30 PM',
        '08:30 PM - 09:00 PM',
    
        // Late Night
        '09:00 PM - 09:30 PM',
        '09:30 PM - 10:00 PM',
        '10:00 PM - 10:30 PM',
        '10:30 PM - 11:00 PM',
        '11:00 PM - 11:30 PM',
        '11:30 PM - 12:00 AM'
    ]
       }
  });
  
  module.exports = ScheduleModel;

  