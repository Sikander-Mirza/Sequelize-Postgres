const express = require('express');
const router = express.Router();
const NotaryInfo = require('../Controllers/NotaryInfoController'); // Update with the correct path

// Route to create a new company
router.post('/NotaryInfo', NotaryInfo);



module.exports = router;