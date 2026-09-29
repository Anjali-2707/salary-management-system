const express = require("express");

const healthRoutes = require("./routes/health.routes");
const employeeRoutes = require("./routes/employee.routes");
const analyticsRoutes = require("./routes/analytics.routes");
const authRoutes = require("./routes/auth.routes");
const {
  authenticate,
} = require("./middleware/auth.middleware");

const {
  notFoundHandler,
} = require("./middleware/not-found.middleware");

const {
  errorHandler,
} = require("./middleware/error.middleware");

const app = express();

app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use(
  "/api/employees",
  authenticate,
  employeeRoutes
);

app.use(
  "/api/analytics",
  authenticate,
  analyticsRoutes
);

app.use(notFoundHandler);

app.use(errorHandler);

module.exports = app;