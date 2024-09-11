const User = require("../Model/UserModel.js");
const ClientModel = require("../Model/ClientModel.js")
const SignerModel = require("../Model/SignerMode.js")
const ScheduleDate = require("../Model/ScheduleModel.js")
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/CloudinaryConfig.js'); // Import Cloudinary configuration
const FileModel = require('../Model/FileModel.js'); // Adjust the path as needed


const CreateUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send({ message: "User created", user });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error creating user", error: err.message });
  }
};

const FindUser =async(req,res)=>{
    try{
    const id = req.params.id;
    const data = await User.findOne({ where: {id}});
    if (data) {
        console.log("User found:", data.toJSON());
        res.json({ message: "User found", user: data.createdAt });
    } else {
        console.log("User not found");
        res.status(404).send("User not found");
    }
    }
    catch(err){
        console.error(err);
        res.status(500).send("Server Error");
    }
}

const DeleteUser = async (req,res)=>{
    try{
    const id = req.params.id;

    const user = await User.findOne({ where: { id } });

    if (user) {
        await user.destroy();

        console.log("User deleted");
        res.json({ message: "User deleted", user: user.toJSON() });
    } else {
        console.log("User not found");
        res.status(404).send("User not found");
    }
    }
    catch(err){
        console.error(err);
        res.status(500).send("Server Error");
    }
}

const UpdateUser = async (req,res)=>{
    try{
    const id = req.params.id;

    const user = await User.findOne({ where: { id } });

    if (user) {
        await user.update(req.body);

        console.log("User updated");
        res.json({ message: "User updated", user: user.toJSON() });
    } else {
        console.log("User not found");
        res.status(404).send("User not found");
    }
    }
    catch(err){
        console.error(err);
        res.status(500).send("Server Error");
    }
}

const CreateClient = async (req, res) => {
    try {
      const data = req.body;
  
      // Validate required fields
      if (!data.ClosingType || !data.titleCompany || !data.InternalReference) {
        return res.status(400).send({ message: "Required fields are missing." });
      }
  
      // Set price based on ClosingType
      switch (data.ClosingType) {
        case "title closing buyer side":
          data.Price = 120.00;
          break;
        case "title closing buyer side with loans":
          data.Price = 140.00;
          break;
        case "title closing seller side":
          data.Price = 120.00;
          break;
        case "Single Document":
          data.Price = 30.00;
          break;
        default:
          return res.status(400).send({ message: "Invalid closing type provided." });
      }
  
      // Create the client record with auto-filled price
      const client = await ClientModel.create(data);
  
      // Send the response
      res.status(201).send({ message: "Client created successfully", client });
    } catch (error) {
      console.error("Error creating client:", error);
      res.status(500).send({ message: "An error occurred while creating the client." });
    }
  };
  
  const CreateSigner = async(req,res)=>{
    try{
      const data = req.body;
  
      // Validate required fields
    //   if (!data.SignerName || !data.SignerEmail || !data.ROle || !data.PhoneNumber) {
    //     return res.status(400).send({ message: "Required fields are missing." });
    //   }
  
      // Create the signer record
      const signer = await SignerModel.create(data);
  
      // Send the response
      res.status(201).send({ message: "Signer created successfully", signer });
  }
  catch(err){
    console.error(err);
    res.status(500).send({ message: "An error occurred while creating the signer." });
  }
}

const CreateSchedule = async(req,res)=>{
    try{
        const data = req.body;
        const schedule = await ScheduleDate.create(data);
        res.status(201).send({ message: "Schedule created successfully", schedule });
    }
    catch(err){
        console.error(err);
        res.status(500).send({ message: "An error occurred while creating the schedule." });
    }
}


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Controller function to handle file upload and store it in the database
const uploadFile = async (req, res) => {
    try {
        // Handle file upload with multer
        upload.single('file')(req, res, async function (err) {
            if (err) {
                console.error('Upload error:', err);
                return res.status(500).json({ message: 'File upload failed', error: err.message });
            }

            if (!req.file) {
                return res.status(400).json({ message: 'No file uploaded' });
            }

            // Extract data from req.file
            const { originalname, buffer, mimetype } = req.file;

            // Store file data in the database
            await FileModel.create({
                fileName: originalname,
                fileData: buffer, // Store file data as BLOB
                fileType: mimetype,
            });

            res.status(200).json({ message: 'File uploaded successfully', file: { name: originalname, type: mimetype } });
        });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};




const getFile = async (req, res) => {
  try {
    const fileName = req.params.name; // Get the file name from the URL parameters

    console.log('Requested file name:', fileName); // Debugging log to check if file name is received correctly

    // Retrieve the file from the database using Sequelize
    const fileRecord = await FileModel.findOne({ where: { fileName } });

    if (!fileRecord) {
      console.log('File not found in database.'); // Debug log to check if file is missing
      return res.status(404).json({ message: 'File not found' }); // Return 404 if not found
    }

    console.log('File record found:', fileRecord); // Debug log to check file data

    // Set the appropriate Content-Type and Content-Disposition headers
    res.setHeader('Content-Type', fileRecord.fileType);
    res.setHeader('Content-Disposition', `attachment; filename="${fileRecord.fileName}"`);

    // Send the binary data as the response
    res.send(fileRecord.fileData); // Ensure this line sends the binary data correctly
  } catch (error) {
    console.error('Error retrieving file:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

  
module.exports = {CreateUser,FindUser,DeleteUser,UpdateUser,CreateClient,CreateSigner,CreateSchedule,uploadFile,getFile}