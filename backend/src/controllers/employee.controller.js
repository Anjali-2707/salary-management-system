const {
  getEmployeeList,
} = require("../services/employee.service");

const getEmployees = (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;

  const result = getEmployeeList({
    page,
    limit,
  });

  res.status(200).json(result);
};

module.exports = {
  getEmployees,
};