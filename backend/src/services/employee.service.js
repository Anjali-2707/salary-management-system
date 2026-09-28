const {
  getEmployees,
  getEmployeeCount,
} = require("../repositories/employee.repository");

const getEmployeeList = ({ page, limit }) => {
  const offset = (page - 1) * limit;

  const employees = getEmployees({
    limit,
    offset,
  });

  const total = getEmployeeCount();

  const totalPages = Math.ceil(total / limit);

  return {
    employees,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
};

module.exports = {
  getEmployeeList,
};