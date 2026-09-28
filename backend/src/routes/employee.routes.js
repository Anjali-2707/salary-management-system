const express = require("express");
const {
  getEmployees,
} = require("../controllers/employee.controller");

const router = express.Router();

router.get("/", getEmployees);

module.exports = router;