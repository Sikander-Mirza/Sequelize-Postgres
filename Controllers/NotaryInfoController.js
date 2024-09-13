const NotaryFileModel = require("../Model/FilesOfNotaryModel.js");
const NotaryInfo = require("../Model/NotaryModel");

// Updated function
const multipleUpload = async (req, res) => {
  try {
    const { id, Name } = req.body;
console.log(id,Name)
    // Create user details first
    const user = await NotaryInfo.create({
      id,
      Name,
    });

    // Upload each file and associate with the user
    const files = req.files;

    // Ensure req.files is not undefined
    if (!files) {
      return res.status(400).json({ error: "No files were uploaded." });
    }

    // Check and upload 'signature' file
    if (files['signature']) {
      await NotaryFileModel.create({
        fileName: files['signature'][0].originalname,
        fileData: files['signature'][0].buffer,
        fileType: files['signature'][0].mimetype,
        userId: id, // Correct field name
      });
    }

    // Check and upload 'initials' file
    if (files['initials']) {
      await NotaryFileModel.create({
        fileName: files['initials'][0].originalname,
        fileData: files['initials'][0].buffer,
        fileType: files['initials'][0].mimetype,
        userId: id, // Correct field name
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
