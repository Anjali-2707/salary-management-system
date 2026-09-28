const {
  getEmployees,
  getEmployeeCount,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require("../repositories/employee.repository");

const getEmployeeDetails = (id) => {
  return getEmployeeById(id);
};

const createNewEmployee = (employee) => {
  const employeeId = createEmployee(employee);

  return getEmployeeById(employeeId);
};

const updateEmployeeDetails = (id, employee) => {
  const existingEmployee = getEmployeeById(id);

  if (!existingEmployee) {
    return null;
  }

  updateEmployee(id, employee);

  return getEmployeeById(id);
};

const deleteEmployeeById = (id) => {
  const existingEmployee = getEmployeeById(id);

  if (!existingEmployee) {
    return false;
  }

  deleteEmployee(id);

  return true;
};

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
  getEmployeeDetails,
  createNewEmployee,
  updateEmployeeDetails,
  deleteEmployeeById
};