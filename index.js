const express = require('express');
const app = express();
const sequelize = require('./infrastructure/db.js');
const User = require('./Model/UserModel.js');
const router = require('./Routes/Route.js');

app.use(express.json());

// Use the router middleware
app.use('/users', router);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the database successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });



