const { Sequelize, DataTypes, where } = require("sequelize");
const express = require("express");
const User = require("./Model/UserModel.js");
const app = express();
const sequelize = require("./infrastructure/db.js")
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(9000, () => {
  console.log("server is running");
});



sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the database successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
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

    const user = await User.findOne({ where: { id } });

    if (user) {
      await user.update(req.body);

      console.log("User updated");
      res.json({ message: "User updated", user: user.toJSON() });
    } else {
      console.log("User not found");
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});
