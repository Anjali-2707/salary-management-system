const express = require("express");

const {
  getSummary,
  getDepartmentSummary,
  getCountrySummary,
} = require("../controllers/analytics.controller");

const router = express.Router();

router.get("/summary", getSummary);

router.get("/departments", getDepartmentSummary);

router.get("/countries", getCountrySummary);

module.exports = router;