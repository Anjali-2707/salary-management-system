const db = require("../database/db");

const getEmployees = ({ limit, offset }) => {
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
      ORDER BY id
      LIMIT ?
      OFFSET ?
    `)
    .all(limit, offset);

  return employees;
};

const getEmployeeCount = () => {
  const result = db
    .prepare(`
      SELECT COUNT(*) AS total
      FROM employees
    `)
    .get();

  return result.total;
};

module.exports = {
  getEmployees,
  getEmployeeCount,
};