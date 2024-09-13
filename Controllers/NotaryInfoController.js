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
        Id:id,
            });
    }

    // Check and upload 'initials' file
    if (files['initials']) {
      await NotaryFileModel.create({
        Id:id,
        fileName: files['initials'][0].originalname,
        fileData: files['initials'][0].buffer,
        fileType: files['initials'][0].mimetype,
       
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




// Get NotaryInfo with associated files
const getNotaryInfo = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the NotaryInfo by id
    const notaryInfo = await NotaryInfo.findByPk(id);

    if (!notaryInfo) {
      return res.status(404).json({ message: "Notary info not found" });
    }

    // Find associated files and select only fileName
    const notaryFiles = await NotaryFileModel.findAll({
      attributes: ['fileName'],  // Only select the fileName field
      where: { Id: id }       // Ensure this matches the field name used in your NotaryFileModel
    });

    // Extract file names from the result
    const fileNames = notaryFiles.map(file => file.fileName);

    // Combine the results
    const response = {
      notaryInfo,
      fileNames
    };

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching notary info" });
  }
};




const deleteNotaryInfo = async (req, res) => {
  try {
    const { id } = req.params;

    // First, delete associated files
    await NotaryFileModel.destroy({
      where: { Id: id },
    });

    // Then, delete the notary info
    const notaryInfo = await NotaryInfo.destroy({
      where: { id },
    });

    if (notaryInfo === 0) {
      return res.status(404).json({ message: "Notary info not found" });
    }

    res.status(200).json({ message: "Notary info and associated files deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error deleting notary info and files" });
  }
};

const updateNotaryInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { Name } = req.body;
    const files = req.files;

    // Find the existing NotaryInfo record
    const notaryInfo = await NotaryInfo.findByPk(id);

    if (!notaryInfo) {
      return res.status(404).json({ message: "Notary info not found" });
    }

    // Update the NotaryInfo record
    await NotaryInfo.update(
      { Name },
      { where: { id } }
    );

    // If files are provided, handle the file updates
    if (files) {
      // Delete existing files associated with the notaryInfo
      await NotaryFileModel.destroy({ where: { Id: id } });

      // Upload new files
      if (files['signature']) {
        await NotaryFileModel.create({
          fileName: files['signature'][0].originalname,
          fileData: files['signature'][0].buffer,
          fileType: files['signature'][0].mimetype,
          Id: id,
        });
      }

      if (files['initials']) {
        await NotaryFileModel.create({
          fileName: files['initials'][0].originalname,
          fileData: files['initials'][0].buffer,
          fileType: files['initials'][0].mimetype,
          Id: id,
        });
      }
    }

    res.status(200).json({ message: "Notary info updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error updating notary info" });
  }
};

module.exports = {multipleUpload,getNotaryInfo,deleteNotaryInfo,updateNotaryInfo};
