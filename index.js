const { Sequelize, DataTypes, where } = require("sequelize");
const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(9000, () => {
  console.log("server is running");
});

const sequelize = new Sequelize("item_master", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the database successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const User = sequelize.define("Customer", {
  firstName: {
    type: DataTypes.STRING, 
  },
  lastName: {
    type: DataTypes.STRING, 
  },
  email: {
    type: DataTypes.STRING, 
    unique: true,
  },
});

app.post("/create", (req, res) => {
  try {
    const data = req.body;
    User.create(data);
    console.log("user Created");
    res.send("user Created").send(data);
  } catch (err) {
    console.log(err);
  }
});

app.get("/find/:id", async (req, res) => {
  try {
    const id = req.params.id; 
    const data = await User.findOne({ where: { id } }); 

    if (data) {
      console.log("User found:", data.toJSON());
      res.json({ message: "User found", user: data.createdAt }); 
    } else {
      console.log("User not found");
      res.status(404).send("User not found"); 
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error"); 
  }
});

app.delete("/delete/:id", async (req, res) => {
    try {
      const id = req.params.id;
  
      const user = await User.findOne({ where: { id } });
  
      if (user) {

        await user.destroy(); 
  
        console.log("User deleted");
        res.json({ message: "User deleted", user: user.toJSON() }); 
      } else {
        console.log("User not found");
        res.status(404).send("User not found");
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  });
  

  app.put("/update/:id", async (req, res) => {
    try {
      const id = req.params.id;
  
      // Find the user by ID
      const user = await User.findOne({ where: { id } });
  
      if (user) {
        // Update user data with the new data from the request body
        await user.update(req.body);
  
        console.log("User updated");
        res.json({ message: "User updated", user: user.toJSON() }); // Return updated user data
      } else {
        console.log("User not found");
        res.status(404).send("User not found");
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  });
  