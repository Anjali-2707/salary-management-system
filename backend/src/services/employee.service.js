const {
  getEmployees,
  getEmployeeCount,
} = require("../repositories/employee.repository");

const getEmployeeList = ({
  page,
  limit,
  search,
  department,
  country,
  sortBy,
  sortOrder,
}) => {
  const offset = (page - 1) * limit;

  const filters = {
    search,
    department,
    country,
  };

  const employees = getEmployees({
    limit,
    offset,
    sortBy,
    sortOrder,
    ...filters,
  });

  const total = getEmployeeCount(filters);

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