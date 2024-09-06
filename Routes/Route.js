const express = require('express');
const router = express.Router();

const { CreateUser, FindUser, DeleteUser, UpdateUser } = require('../Controllers/Controlle.js');

router.post('/create', CreateUser);
router.get('/find/:id', FindUser);
router.delete('/delete/:id', DeleteUser);
router.put('/update/:id', UpdateUser);

module.exports = router;
