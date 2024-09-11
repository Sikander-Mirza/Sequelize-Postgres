const Menu = require('../Model/MenuModel.js'); // Update with the correct path to your Menu model

// Create a new menu item
exports.createMenu = async (req, res) => {
  try {
    const { MenuName, MenuIcon, MenuUrl, Status } = req.body;

    // Create a new menu item
    const newMenu = await Menu.create({
      MenuName,
      MenuIcon,
      MenuUrl,
      Status
    });

    res.status(201).json({ message: 'Menu item created successfully', menu: newMenu });
  } catch (error) {
    res.status(400).json({ message: 'Error creating menu item', error: error.message });
  }
};

// Get a single menu item by ID
// Get all menu items
exports.getAllMenus = async (req, res) => {
    try {
      // Retrieve all menu items
      const menus = await Menu.findAll();
  
      if (!menus.length) {
        return res.status(404).json({ message: 'No menu items found' });
      }
  
      res.status(200).json({ menus });
    } catch (error) {
      res.status(400).json({ message: 'Error retrieving menu items', error: error.message });
    }
  };
  

// Update an existing menu item by ID
exports.updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { MenuName, MenuIcon, MenuUrl, Status } = req.body;

    // Find the menu item by ID and update it
    const [updated] = await Menu.update(
      { MenuName, MenuIcon, MenuUrl, Status },
      { where: { id }, returning: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    const updatedMenu = await Menu.findByPk(id);

    res.status(200).json({ message: 'Menu item updated successfully', menu: updatedMenu });
  } catch (error) {
    res.status(400).json({ message: 'Error updating menu item', error: error.message });
  }
};

// Delete a menu item by ID
exports.deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the menu item by ID and delete it
    const deleted = await Menu.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting menu item', error: error.message });
  }
};
