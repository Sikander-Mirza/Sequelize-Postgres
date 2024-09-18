const User = require("../Model/UserModel.js");
const ClientModel = require("../Model/ClientModel.js")
const SignerModel = require("../Model/SignerMode.js")
const ScheduleDate = require("../Model/ScheduleModel.js")
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/CloudinaryConfig.js'); // Import Cloudinary configuration
const FileModel = require('../Model/FileModel.js'); // Adjust the path as needed
const sequelize = require('../infrastructure/db.js');



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
      // Retrieve clientId from the request headers
      const clientId = req.params.clientId; // Use route parameter

      if (!clientId) {
          return res.status(400).json({ message: 'clientId is required in headers' });
      }

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

          try {
              // Store file data in the database with the associated clientId
              await FileModel.create({
                  fileName: originalname,
                  fileData: buffer, // Store file data as BLOB
                  fileType: mimetype,
                  clientId: clientId, // Associate with clientId
              });

              res.status(200).json({ message: 'File uploaded successfully', file: { name: originalname, type: mimetype } });
          } catch (dbError) {
              console.error('Error saving file data to database:', dbError);
              return res.status(500).json({ message: 'Failed to save file data', error: dbError.message });
          }
      });
  } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};





const getFile = async (req, res) => {
  try {
    const fileName = req.params.name; 

    console.log('Requested file name:', fileName); 

    // Retrieve the file from the database using Sequelize
    const fileRecord = await FileModel.findOne({ where: { fileName } });

    if (!fileRecord) {
      console.log('File not found in database.'); 
      return res.status(404).json({ message: 'File not found' });
    }

    console.log('File record found:', fileRecord); 

    res.setHeader('Content-Type', fileRecord.fileType);
    res.setHeader('Content-Disposition', `attachment; filename="${fileRecord.fileName}"`);

    res.send(fileRecord.fileData); 
  } catch (error) {
    console.error('Error retrieving file:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const getSignerAndClientInfo = async (req, res) => {
  try {
    const signers = await SignerModel.findAll({
      include: [
        {
          model: ClientModel,
          attributes: ['AddressOne', 'City'], 
        },
      ],
      attributes: ['SignerName', 'SignerEmail', 'PhoneNumber'], 
    });

    console.log(signers); 
    res.status(200).json(signers);
  } catch (error) {
    console.error('Error fetching signer and client info:', error.message);
    res.status(500).json({ error: 'Error fetching signer and client info' });
  }
};


const getClientDetails = async (req, res) => {
  try {
    const clients = await ClientModel.findAll({
      include: [
        {
          model: SignerModel,
          attributes: ['SignerName', 'SignerEmail', 'PhoneNumber'],
        },
        {
          model: ScheduleDate,
          attributes: ['ScheduleTime'],
        },
        {
          model: FileModel,
          attributes: ['fileName'],
        },
      ],
      attributes: ['titleCompany', 'ClosingType'],
    });

    const result = clients.map((client) => {
      return {
        titleCompany: client.titleCompany,
        ClosingType: client.ClosingType,
        SignerName: client.Signers[0]?.SignerName || null, 
        SignerEmail: client.Signers[0]?.SignerEmail || null,
        PhoneNumber: client.Signers[0]?.PhoneNumber || null,
        ScheduleTime: client.Schedules[0]?.ScheduleTime || null, 
        DocumentUploaded: client.Files && client.Files.length > 0, 
      };
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching client details with signer and schedule:', error.message);
    res.status(500).json({ error: 'Error fetching client details with signer and schedule' });
  }
};




const getClientDetailsWithRightJoin = async (req, res) => {
  try {
    const clientsWithRightJoin = await sequelize.query(`
      SELECT 
        client."titleCompany",
        client."ClosingType",
        signer."SignerName"
      FROM 
        "Clients" AS client
      RIGHT OUTER JOIN 
        "Signers" AS signer
      ON 
        client.id = signer."clientId";  
    `, {
      type: sequelize.QueryTypes.SELECT
    });

    // Send the resulting data as the response
    res.status(200).json(clientsWithRightJoin);
  } catch (error) {
    console.error('Error fetching client details with right outer join:', error.message);
    res.status(500).json({ error: 'Error fetching client details with right outer join' });
  }
};







module.exports = {CreateUser,FindUser,DeleteUser,UpdateUser,CreateClient,CreateSigner,CreateSchedule,uploadFile,getFile,getSignerAndClientInfo,getClientDetails,getClientDetailsWithRightJoin}