const express = require("express");

const healthRoutes = require("./routes/health.routes");
const employeeRoutes = require("./routes/employee.routes");

const app = express();

app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/employees", employeeRoutes);

module.exports = app;