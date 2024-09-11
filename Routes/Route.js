const express = require('express');
const router = express.Router();
const { CreateUser, FindUser, DeleteUser, UpdateUser,CreateClient,CreateSigner, CreateSchedule, uploadFile,getFile } = require('../Controllers/Controlle.js');

router.post('/create', CreateUser);
router.get('/find/:id', FindUser);
router.delete('/delete/:id', DeleteUser);
router.put('/update/:id', UpdateUser);

router.post("/client",CreateClient)
router.post("/signer",CreateSigner)
router.post("/schedule",CreateSchedule)
router.post('/upload', uploadFile);
router.get('/file/:name', getFile);
module.exports = router;
