const express = require('express');
const app = express();
const sequelize = require('./infrastructure/db.js');
const router = require('./Routes/Route.js');
const path = require("path")

app.use(express.json());

// Use the router for handling '/users' routes
app.use('/users', router);

// A simple GET endpoint
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start the server
const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Authenticate and sync with the database
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the database successfully.");

    // Sync the database and create tables if they don't exist
    return sequelize.sync({ force: true }); // Use force: true for development if you need to recreate the tables
  })
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => {
    console.error("Error connecting to the database or creating tables:", err);
  });
