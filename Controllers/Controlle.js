const User = require("../Model/UserModel.js");
const ClientModel = require("../Model/ClientModel.js")
const SignerModel = require("../Model/SignerMode.js")
const ScheduleDate = require("../Model/ScheduleModel.js")
const multer = require('multer');
const path = require('path');
const fs = require('fs');

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


const uploadDir = path.join(__dirname, '../uploads');

// Ensure the uploads directory exists
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage options
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Initialize multer with storage configuration
const upload = multer({ storage: storage });

// Controller function to handle file upload
const uploadFile = (req, res) => {
    upload.single('file')(req, res, function (err) {
        if (err) {
            return res.status(500).json({ message: 'File upload failed', error: err.message });
        }
        res.status(200).json({ message: 'File uploaded successfully', file: req.file });
    });
};

module.exports = {CreateUser,FindUser,DeleteUser,UpdateUser,CreateClient,CreateSigner,CreateSchedule,uploadFile}