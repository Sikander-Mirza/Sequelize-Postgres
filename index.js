const express = require("express");
const app = express();
const sequelize = require("./infrastructure/db.js");
const router = require("./Routes/Route.js");
const path = require("path");
const companyRoutes = require("./Routes/CompanyRoute.js");
const userRoutes = require("./Routes/UserManagementRoute.js");
const MenuRoutes = require("./Routes/MenuRoute.js");
const SubMenuRoutes = require("./Routes/SubMenuRoute.js");
const ServiceRoutes = require("./Routes/ServiceRoute.js");
const ClientModel = require("./Model/ClientModel.js");
const SignerModel = require("./Model/SignerMode.js");
const ScheduleModel = require("./Model/ScheduleModel.js");
const FileModel = require("./Model/FileModel.js");
const NotayInfoRoutes = require("./Routes/NotaryInfoRoute.js");
app.use(express.json());

// Use the router for handling '/users' routes
app.use("/users", router);

// A simple GET endpoint
app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use(companyRoutes);
app.use(userRoutes);
app.use(MenuRoutes);
app.use(SubMenuRoutes);
app.use(ServiceRoutes);

app.use(NotayInfoRoutes);




ClientModel.hasMany(SignerModel, { foreignKey: "clientId", onDelete: "CASCADE", });
SignerModel.belongsTo(ClientModel, { foreignKey: "clientId" });

ClientModel.hasMany(ScheduleModel, { foreignKey: "clientId", onDelete: "CASCADE", });
ScheduleModel.belongsTo(ClientModel, { foreignKey: "clientId" });

ClientModel.hasMany(FileModel, { foreignKey: "clientId", onDelete: "CASCADE" });
FileModel.belongsTo(ClientModel, { foreignKey: "clientId" });
// Start the server
const PORT = 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Authenticate and sync with the database
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the database successfully.");

    // Sync the database and create tables if they don't exist
    return sequelize.sync({ alter: true }); // Use force: true for development if you need to recreate the tables
  })
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => {
    console.error("Error connecting to the database or creating tables:", err);
  });
