const express = require('express');
const multer = require('multer');
const router = express.Router();
const {
  multipleUpload,
  getNotaryInfo,
  deleteNotaryInfo,
  updateNotaryInfo
} = require("../Controllers/NotaryInfoController"); // Update with the correct path

// Set up multer for file handling
const storage = multer.memoryStorage(); // Store files in memory buffer
const upload = multer({ storage });

// Route for handling both text data and multiple file uploads
router.post('/NotaryInfo', upload.fields([
  { name: 'signature', maxCount: 1 },  // Field names must match your form data
  { name: 'initials', maxCount: 1 },
  // Add more fields as needed
]), multipleUpload);

// Route to get NotaryInfo by ID
router.get('/notaryinfo/:id', getNotaryInfo);

// Route to delete NotaryInfo by ID
router.delete('/notaryinfo/:id', deleteNotaryInfo);

// Route to update NotaryInfo by ID, including file uploads
router.put('/notaryinfo/:id', upload.fields([
  { name: 'signature', maxCount: 1 },  // Field names must match your form data
  { name: 'initials', maxCount: 1 },
  // Add more fields as needed
]), updateNotaryInfo);

module.exports = router;
