const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({ 
    cloud_name: 'dwul2hfvj', 
    api_key: '725959839144441', 
    api_secret: 'dPV-3z6Iv4pvNbmWJsAq3xUPr2A' // Click 'View API Keys' above to copy your API secret
});

module.exports = cloudinary;
