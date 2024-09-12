const { DataTypes } = require("sequelize");
const sequelize = require("../infrastructure/db.js");
const NotaryInfo = require("./NotaryModel.js");

const NotaryFileModel = sequelize.define("NotaryFile", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, // Each file has a unique identifier
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fileData: {
    type: DataTypes.BLOB, // Binary data of the file
    allowNull: false,
  },
  fileType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER, // Foreign key to UserDetails
    references: {
      model: "UserDetails",
      key: "id",
    },
    allowNull: false,
  },
});

// Each file belongs to one user
NotaryFileModel.belongsTo(NotaryInfo, {
  foreignKey: "userId",
  as: "user",
});

module.exports = NotaryFileModel;
