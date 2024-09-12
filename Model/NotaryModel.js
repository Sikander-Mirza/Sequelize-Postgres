const { DataTypes } = require("sequelize");
const sequelize = require("../infrastructure/db.js");
const NotaryFileModel = require("./NotaryFiless.js");
const NotaryInfo = sequelize.define(
  "NotaryInfo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // This ensures each user has a unique identifier
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    timeZone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    signatureFileId: {
      type: DataTypes.INTEGER,
      references: {
        model: "NotaryFileModel", // Reference the FileModel
        key: "id",
      },
      allowNull: true,
    },
    initialsFileId: {
      type: DataTypes.INTEGER,
      references: {
        model: "NotaryFileModel", // Reference the FileModel
        key: "id",
      },
      allowNull: true,
    },
    sealFileId: {
      type: DataTypes.INTEGER,
      references: {
        model: "NotaryFileModel", // Reference the FileModel
        key: "id",
      },
      allowNull: true,
    },
    disclosure: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    commissionIDNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    commissionState: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    commissionExpirationDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    commissionCertificateId: {
      type: DataTypes.INTEGER,
      references: {
        model: "NotaryFileModel", // Reference the FileModel
        key: "id",
      },
      allowNull: true,
    },
    identrustCertFileId: {
      type: DataTypes.INTEGER,
      references: {
        model: "NotaryFileModel", // Reference the FileModel
        key: "id",
      },
      allowNull: true,
    },
    identrustDigitalCertExpiration: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    identrustDigitalCertPassphrase: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    eoCertificateId: {
      type: DataTypes.INTEGER,
      references: {
        model: "NotaryFileModel", // Reference the FileModel
        key: "id",
      },
      allowNull: true,
    },
    eoExpirationDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    errorsAndOmissionsAmount: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bondCertificateId: {
      type: DataTypes.INTEGER,
      references: {
        model: "NotaryFileModel", // Reference the FileModel
        key: "id",
      },
      allowNull: true,
    },
    bondExpirationDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    bondAmount: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isNotarySigningAgent: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    canSpeakGerman: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    canSpeakSpanish: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    canSpeakRussian: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    canSpeakChinese: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    canSpeakPortuguese: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    canSpeakFrench: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    canSpeakItalian: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = NotaryInfo;
