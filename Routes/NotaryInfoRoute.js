const express = require('express');
const multer = require('multer');
const router = express.Router();
const {
  multipleUpload,
  getNotaryInfo,
  deleteNotaryInfo,
  updateNotaryInfo,
  uploadFile
} = require("../Controllers/NotaryInfoController"); // Update with the correct path




const storage = multer.memoryStorage();
const upload = multer({storage})

router.post('/NotaryInfo', upload.fields([
  { name: 'signature', maxCount: 1 },  
  { name: 'initials', maxCount: 1 },
  
]), multipleUpload);

router.post("/uploadfiles",upload.fields([
  {name:'yahoo',maxCount:1}
]),uploadFile)

router.get('/notaryinfo/:id', getNotaryInfo);


router.delete('/notaryinfo/:id', deleteNotaryInfo);


router.put('/notaryinfo/:id', upload.fields([
  { name: 'signature', maxCount: 1 },  
  { name: 'initials', maxCount: 1 },
  
]), updateNotaryInfo);

module.exports = router;
