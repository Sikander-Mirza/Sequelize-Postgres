const NotaryFileModel = require("../Model/NotaryFiless.js");
const NotaryInfo = require("../Model/NotaryModel");


const multipleUpload = async (req, res) => {
  try {
    // Destructure all fields from req.body
    const {
      fullName,
      emailAddress,
      address1,
      address2,
      city,
      state,
      zipCode,
      timeZone,
      contactNumber,
      password,
      disclosure,
      commissionIDNumber,
      commissionState,
      commissionExpirationDate,
      identrustDigitalCertExpiration,
      identrustDigitalCertPassphrase,
      eoExpirationDate,
      errorsAndOmissionsAmount,
      bondExpirationDate,
      bondAmount,
      isNotarySigningAgent,
      canSpeakGerman,
      canSpeakSpanish,
      canSpeakRussian,
      canSpeakChinese,
      canSpeakPortuguese,
      canSpeakFrench,
      canSpeakItalian,
      title,
    } = req.body;

    // Create user details first
    const user = await NotaryInfo.create({
      fullName,
      emailAddress,
      address1,
      address2,
      city,
      state,
      zipCode,
      timeZone,
      contactNumber,
      password,
      disclosure,
      commissionIDNumber,
      commissionState,
      commissionExpirationDate,
      identrustDigitalCertExpiration,
      identrustDigitalCertPassphrase,
      eoExpirationDate,
      errorsAndOmissionsAmount,
      bondExpirationDate,
      bondAmount,
      isNotarySigningAgent,
      canSpeakGerman,
      canSpeakSpanish,
      canSpeakRussian,
      canSpeakChinese,
      canSpeakPortuguese,
      canSpeakFrench,
      canSpeakItalian,
      title,
    });

    // Upload each file and associate with the user
    const files = req.files;

    // Check and upload 'signature' file
    if (files["signature"]) {
      await NotaryFileModel.create({
        fileName: files["signature"][0].originalname,
        fileData: files["signature"][0].buffer,
        fileType: files["signature"][0].mimetype,
        userId: user.id,
      });
    }

    // Check and upload 'initials' file
    if (files["initials"]) {
      await NotaryFileModel.create({
        fileName: files["initials"][0].originalname,
        fileData: files["initials"][0].buffer,
        fileType: files["initials"][0].mimetype,
        userId: user.id,
      });
    }

    // Check and upload 'seal' file
    if (files["seal"]) {
      await NotaryFileModel.create({
        fileName: files["seal"][0].originalname,
        fileData: files["seal"][0].buffer,
        fileType: files["seal"][0].mimetype,
        userId: user.id,
      });
    }

    // Check and upload 'commission' file
    if (files["commission"]) {
      await NotaryFileModel.create({
        fileName: files["commission"][0].originalname,
        fileData: files["commission"][0].buffer,
        fileType: files["commission"][0].mimetype,
        userId: user.id,
      });
    }

    // Check and upload 'Identrust' file
    if (files["Identrust"]) {
      await NotaryFileModel.create({
        fileName: files["Identrust"][0].originalname,
        fileData: files["Identrust"][0].buffer,
        fileType: files["Identrust"][0].mimetype,
        userId: user.id,
      });
    }

    // Check and upload 'eo' file
    if (files["eo"]) {
      await NotaryFileModel.create({
        fileName: files["eo"][0].originalname,
        fileData: files["eo"][0].buffer,
        fileType: files["eo"][0].mimetype,
        userId: user.id,
      });
    }

    // Check and upload 'bond' file
    if (files["bond"]) {
      await NotaryFileModel.create({
        fileName: files["bond"][0].originalname,
        fileData: files["bond"][0].buffer,
        fileType: files["bond"][0].mimetype,
        userId: user.id,
      });
    }

    // Respond with success
    res.status(201).json({
      message: "User and files uploaded successfully",
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Error uploading files and user data",
    });
  }
};

module.exports = multipleUpload;
