const { DataTypes } = require('sequelize');
const sequelize = require('../infrastructure/db.js');

// Enums for time zones and states
const timeZones = [
  "Pacific/Kwajalein", "Pacific/Samoa", "Pacific/Midway", "Pacific/Honolulu", "America/Juneau",
  "America/Los_Angeles", "America/Denver", "America/Chicago", "America/New_York", "America/Caracas",
  "America/St_Johns", "America/Sao_Paulo", "Atlantic/South_Georgia", "Atlantic/Azores", "Atlantic/Reykjavik",
  "Europe/London", "Europe/Paris", "Europe/Moscow", "Asia/Tehran", "Asia/Dubai", "Asia/Kabul", "Asia/Karachi",
  "Asia/Kolkata", "Asia/Kathmandu", "Asia/Dhaka", "Asia/Yangon", "Asia/Bangkok", "Asia/Hong_Kong", "Australia/Eucla",
  "Asia/Tokyo", "Australia/Adelaide", "Australia/Sydney", "Australia/Lord_Howe", "Pacific/Noumea", "Pacific/Norfolk",
  "Pacific/Auckland", "Pacific/Chatham", "Pacific/Tongatapu", "Pacific/Kiritimati"
];

const states = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
  "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma",
  "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah",
  "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

// Define the Company Model with embedded contacts
const Company = sequelize.define('Company', {
  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  companyAddressLine1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  companyAddressLine2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  companyCity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  companyState: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [states], // Ensure value is one of the predefined states
    },
  },
  companyZIP: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  preferredNotaryID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  requireKBA: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  primaryContact: {
    type: DataTypes.JSONB,
    allowNull: false,
    validate: {
      isContactValid(value) {
        validateContact(value); // Custom function to validate contact
      }
    }
  },
  secondaryContact: {
    type: DataTypes.JSONB,
    allowNull: true,
    validate: {
      isContactValid(value) {
        validateContact(value);
      }
    }
  },
  thirdContact: {
    type: DataTypes.JSONB,
    allowNull: true,
    validate: {
      isContactValid(value) {
        validateContact(value);
      }
    }
  },
  fourthContact: {
    type: DataTypes.JSONB,
    allowNull: true,
    validate: {
      isContactValid(value) {
        validateContact(value);
      }
    }
  },
}, {
  tableName: 'Companies',
  timestamps: true,
});

// Custom function to validate contact details
function validateContact(contact) {
  if (!contact || typeof contact !== 'object') {
    throw new Error('Contact must be an object');
  }
  if (!contact.name || typeof contact.name !== 'string') {
    throw new Error('Contact name is required and must be a string');
  }
  if (!contact.number || typeof contact.number !== 'string') {
    throw new Error('Contact number is required and must be a string');
  }
  if (contact.timeZone && !timeZones.includes(contact.timeZone)) {
    throw new Error('Invalid time zone provided');
  }
}



module.exports = { Company };
