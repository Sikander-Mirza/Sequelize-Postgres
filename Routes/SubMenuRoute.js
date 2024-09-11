const express = require('express');
const router = express.Router();
const SubMenuController = require('../Controllers/SubMenuController.js'); // Update with the correct path to your MenuController

// Create a new menu item
router.post('/Submenus', SubMenuController.createMenu);

// Get all menu items
router.get('/Submenus', SubMenuController.getAllMenus);

// Update an existing menu item by ID
router.put('/Submenus/:id', SubMenuController.updateMenu);

// Delete a menu item by ID
router.delete('/Submenus/:id', SubMenuController.deleteMenu);

module.exports = router;
