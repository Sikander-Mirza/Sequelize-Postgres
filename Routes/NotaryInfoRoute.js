const express = require('express');
const multer = require('multer');
const router = express.Router();
const {multipleUpload,getNotaryInfo, deleteNotaryInfo} = require("../Controllers/NotaryInfoController"); // Update with the correct path

// Set up multer for file handling
const storage = multer.memoryStorage(); // Store files in memory buffer
const upload = multer({ storage });

// Route for handling both text data and multiple file uploads
router.post('/NotaryInfo', upload.fields([
  { name: 'signature', maxCount: 1 },  // Field names must match your form data
  { name: 'initials', maxCount: 1 },
  // Add more fields as needed
]), multipleUpload);

router.get('/notaryinfo/:id', getNotaryInfo);
router.delete('/notaryinfo/:id',deleteNotaryInfo)


module.exports = router;
