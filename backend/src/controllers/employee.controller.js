const {
  getEmployeeList,
} = require("../services/employee.service");

const {
  validateEmployeeQuery,
} = require("../validators/employee-query.validator");

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

module.exports = {
  getEmployees,
};