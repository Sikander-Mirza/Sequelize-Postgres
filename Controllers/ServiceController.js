const ServiceModel = require('../Model/ServicesModel.js'); // Update with the correct path

// Create a new service
exports.createService = async (req, res) => {
  try {
    const { ServiceName, ServicePrice, Status } = req.body;
    
    // Create a new service instance
    const newService = await ServiceModel.create({
      ServiceName,
      ServicePrice,
      Status
    });

    res.status(201).json({
      message: 'Service created successfully',
      service: newService
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error creating service',
      error: error.message
    });
  }
};

// Retrieve all services
exports.getAllServices = async (req, res) => {
  try {
    // Retrieve all services
    const services = await ServiceModel.findAll();

    res.status(200).json({
      message: 'Services retrieved successfully',
      services
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving services',
      error: error.message
    });
  }
};

// Retrieve a single service by ID
exports.getServiceById = async (req, res) => {
  try {
    const serviceId = req.params.id;

    // Retrieve the service by ID
    const service = await ServiceModel.findByPk(serviceId);

    if (!service) {
      return res.status(404).json({
        message: 'Service not found'
      });
    }

    res.status(200).json({
      message: 'Service retrieved successfully',
      service
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving service',
      error: error.message
    });
  }
};

// Update an existing service
exports.updateService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const { ServiceName, ServicePrice, Status } = req.body;

    // Find the service by ID and update with the new data
    const [updated] = await ServiceModel.update(
      { ServiceName, ServicePrice, Status },
      { where: { id: serviceId } }
    );

    if (!updated) {
      return res.status(404).json({
        message: 'Service not found'
      });
    }

    // Retrieve the updated service
    const updatedService = await ServiceModel.findByPk(serviceId);

    res.status(200).json({
      message: 'Service updated successfully',
      service: updatedService
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error updating service',
      error: error.message
    });
  }
};

// Delete an existing service
exports.deleteService = async (req, res) => {
  try {
    const serviceId = req.params.id;

    // Find the service by ID and delete it
    const deleted = await ServiceModel.destroy({
      where: { id: serviceId }
    });

    if (!deleted) {
      return res.status(404).json({
        message: 'Service not found'
      });
    }

    res.status(200).json({
      message: 'Service deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting service',
      error: error.message
    });
  }
};
