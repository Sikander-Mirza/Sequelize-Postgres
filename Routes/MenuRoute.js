const express = require('express');
const router = express.Router();
const MenuController = require('../Controllers/MenuController'); // Update with the correct path to your MenuController

// Create a new menu item
router.post('/menus', MenuController.createMenu);

// Get all menu items
router.get('/menus', MenuController.getAllMenus);

// Update an existing menu item by ID
router.put('/menus/:id', MenuController.updateMenu);

// Delete a menu item by ID
router.delete('/menus/:id', MenuController.deleteMenu);

module.exports = router;
