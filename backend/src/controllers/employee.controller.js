const {
  getEmployeeList,
  getEmployeeDetails,
  createNewEmployee,
  updateEmployeeDetails,
  deleteEmployeeById
} = require("../services/employee.service");

const getEmployeeById = (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      error: "Employee id must be a positive integer",
    });
  }

  const employee = getEmployeeDetails(id);

  if (!employee) {
    return res.status(404).json({
      error: "Employee not found",
    });
  }

  return res.status(200).json(employee);
};

const {
  validateEmployeeQuery,
} = require("../validators/employee-query.validator");

const {
  validateEmployee,
} = require("../validators/employee.validator");

const getEmployees = (req, res) => {
  const validation = validateEmployeeQuery(req.query);

  if (validation.error) {
    return res.status(400).json({
      error: validation.error,
    });
  }

  const result = getEmployeeList(validation.value);

  return res.status(200).json(result);
};

const createEmployee = (req, res) => {
  const validation = validateEmployee(req.body);

  if (validation.error) {
    return res.status(400).json({
      error: validation.error,
    });
  }

  const employee = createNewEmployee(validation.value);

  return res.status(201).json(employee);
};

// const updateEmployee = (req, res) => {
//   const id = Number(req.params.id);

//   if (!Number.isInteger(id) || id < 1) {
//     return res.status(400).json({
//       error: "Employee id must be a positive integer",
//     });
//   }

//   const validation = validateEmployee(req.body);

//   if (validation.error) {
//     return res.status(400).json({
//       error: validation.error,
//     });
//   }

//   try {
//     const employee = updateEmployeeDetails(
//       id,
//       validation.value
//     );

//     if (!employee) {
//       return res.status(404).json({
//         error: "Employee not found",
//       });
//     }

//     return res.status(200).json(employee);
//   } catch (error) {
//     if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
//       return res.status(409).json({
//         error: "Employee ID or email already exists",
//       });
//     }

//     throw error;
//   }
// };

const updateEmployee = (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      error: "Employee id must be a positive integer",
    });
  }

  const validation = validateEmployee(req.body);

  if (validation.error) {
    return res.status(400).json({
      error: validation.error,
    });
  }

  const employee = updateEmployeeDetails(
    id,
    validation.value
  );

  if (!employee) {
    return res.status(404).json({
      error: "Employee not found",
    });
  }

  return res.status(200).json(employee);
};

const deleteEmployee = (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      error: "Employee id must be a positive integer",
    });
  }

  const deleted = deleteEmployeeById(id);

  if (!deleted) {
    return res.status(404).json({
      error: "Employee not found",
    });
  }

  return res.status(204).send();
};

module.exports = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
};