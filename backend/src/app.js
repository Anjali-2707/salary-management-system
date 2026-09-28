const express = require("express");

const healthRoutes = require("./routes/health.routes");
const employeeRoutes = require("./routes/employee.routes");

const {
  notFoundHandler,
} = require("./middleware/not-found.middleware");

const {
  errorHandler,
} = require("./middleware/error.middleware");

const app = express();

app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/employees", employeeRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

module.exports = app;