const express = require("express");

const {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeFilterOptions
} = require("../controllers/employee.controller");

const router = express.Router();

router.get("/", getEmployees);
router.get("/filter-options", getEmployeeFilterOptions);
router.get("/:id", getEmployeeById);
router.post("/", createEmployee);
router.put("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);

module.exports = router;