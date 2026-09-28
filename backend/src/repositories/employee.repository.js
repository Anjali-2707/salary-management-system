const db = require("../database/db");

const SORT_COLUMNS = {
  employeeId: "employee_id",
  firstName: "first_name",
  lastName: "last_name",
  department: "department",
  country: "country",
  annualSalary: "annual_salary",
  joiningDate: "joining_date",
};

const buildFilters = ({
  search,
  department,
  country,
}) => {
  const conditions = [];
  const params = [];

  if (search) {
    conditions.push(`
      (
        first_name LIKE ?
        OR last_name LIKE ?
        OR email LIKE ?
        OR employee_id LIKE ?
      )
    `);

    const searchValue = `%${search}%`;

    params.push(
      searchValue,
      searchValue,
      searchValue,
      searchValue
    );
  }

  if (department) {
    conditions.push("department = ?");
    params.push(department);
  }

  if (country) {
    conditions.push("country = ?");
    params.push(country);
  }

  const whereClause =
    conditions.length > 0
      ? `WHERE ${conditions.join(" AND ")}`
      : "";

  return {
    whereClause,
    params,
  };
};

const getEmployees = ({
  limit,
  offset,
  search,
  department,
  country,
  sortBy,
  sortOrder,
}) => {
  const {
    whereClause,
    params,
  } = buildFilters({
    search,
    department,
    country,
  });

  const sortColumn = SORT_COLUMNS[sortBy];
  const sortDirection =
    sortOrder === "desc" ? "DESC" : "ASC";

  const employees = db
    .prepare(`
      SELECT
        id,
        employee_id,
        first_name,
        last_name,
        email,
        department,
        designation,
        country,
        currency,
        annual_salary,
        joining_date,
        created_at,
        updated_at
      FROM employees
      ${whereClause}
      ORDER BY ${sortColumn} ${sortDirection}
      LIMIT ?
      OFFSET ?
    `)
    .all(...params, limit, offset);

  return employees;
};

const getEmployeeCount = ({
  search,
  department,
  country,
}) => {
  const {
    whereClause,
    params,
  } = buildFilters({
    search,
    department,
    country,
  });

  const result = db
    .prepare(`
      SELECT COUNT(*) AS total
      FROM employees
      ${whereClause}
    `)
    .get(...params);

  return result.total;
};

const getEmployeeById = (id) => {
  const employee = db
    .prepare(`
      SELECT
        id,
        employee_id,
        first_name,
        last_name,
        email,
        department,
        designation,
        country,
        currency,
        annual_salary,
        joining_date,
        created_at,
        updated_at
      FROM employees
      WHERE id = ?
    `)
    .get(id);

  return employee;
};

const createEmployee = (employee) => {
  const result = db
    .prepare(`
      INSERT INTO employees (
        employee_id,
        first_name,
        last_name,
        email,
        department,
        designation,
        country,
        currency,
        annual_salary,
        joining_date
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .run(
      employee.employeeId,
      employee.firstName,
      employee.lastName,
      employee.email,
      employee.department,
      employee.designation,
      employee.country,
      employee.currency,
      employee.annualSalary,
      employee.joiningDate
    );

  return Number(result.lastInsertRowid);
};

const updateEmployee = (id, employee) => {
  const result = db
    .prepare(`
      UPDATE employees
      SET
        employee_id = ?,
        first_name = ?,
        last_name = ?,
        email = ?,
        department = ?,
        designation = ?,
        country = ?,
        currency = ?,
        annual_salary = ?,
        joining_date = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `)
    .run(
      employee.employeeId,
      employee.firstName,
      employee.lastName,
      employee.email,
      employee.department,
      employee.designation,
      employee.country,
      employee.currency,
      employee.annualSalary,
      employee.joiningDate,
      id
    );

  return result.changes;
};

const deleteEmployee = (id) => {
  const result = db
    .prepare(`
      DELETE FROM employees
      WHERE id = ?
    `)
    .run(id);

  return result.changes;
};

const getEmployeeFilterOptions = () => {
  const departments = db
    .prepare(`
      SELECT DISTINCT department
      FROM employees
      ORDER BY department
    `)
    .all();

  const countries = db
    .prepare(`
      SELECT DISTINCT country
      FROM employees
      ORDER BY country
    `)
    .all();

  return {
    departments,
    countries,
  };
};

module.exports = {
  getEmployees,
  getEmployeeCount,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeFilterOptions
};