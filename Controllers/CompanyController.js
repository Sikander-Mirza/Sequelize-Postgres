const { Company } = require('../Model/CompanyModel.js'); // Update with the correct path to your Company model

// Create a new company
const createCompany = async (req, res) => {
  try {
    const { 
      companyName,
      companyAddressLine1,
      companyAddressLine2,
      companyCity,
      companyState,
      companyZIP,
      preferredNotaryID,
      primaryContact,
      secondaryContact,
      thirdContact,
      fourthContact,
      requireKBA 
    } = req.body;

    // Create a new company record
    const newCompany = await Company.create({
      companyName,
      companyAddressLine1,
      companyAddressLine2,
      companyCity,
      companyState,
      companyZIP,
      preferredNotaryID,
      primaryContact,
      secondaryContact,
      thirdContact,
      fourthContact,
      requireKBA
    });

    // Return the saved company in the response
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an existing company
const updateCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    const updates = req.body;

    // Find the company by ID and update with the new data
    const [updatedRowsCount, [updatedCompany]] = await Company.update(updates, {
      where: { id: companyId },
      returning: true, // Option to return the updated document
      individualHooks: true, // Option to run hooks
    });

    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Return the updated company in the response
    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an existing company
const deleteCompany = async (req, res) => {
  try {
    const companyId = req.params.id;

    // Find the company by ID and delete it
    const deletedRowsCount = await Company.destroy({
      where: { id: companyId }
    });

    if (deletedRowsCount === 0) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Return a success message
    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createCompany,
  updateCompany,
  deleteCompany
};
