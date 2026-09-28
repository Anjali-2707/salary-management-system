const db = require("../database/db");

const getTotalEmployeeCount = () => {
  const result = db
    .prepare(`
      SELECT COUNT(*) AS total
      FROM employees
    `)
    .get();

  return result.total;
};

const getSalarySummaryByCurrency = () => {
  return db
    .prepare(`
      SELECT
        currency,
        COUNT(*) AS employee_count,
        SUM(annual_salary) AS total_payroll,
        ROUND(AVG(annual_salary), 2) AS average_salary,
        MIN(annual_salary) AS minimum_salary,
        MAX(annual_salary) AS maximum_salary
      FROM employees
      GROUP BY currency
      ORDER BY currency
    `)
    .all();
};

const getSalarySummaryByDepartment = () => {
  return db
    .prepare(`
      SELECT
        department,
        currency,
        COUNT(*) AS employee_count,
        SUM(annual_salary) AS total_payroll,
        ROUND(AVG(annual_salary), 2) AS average_salary,
        MIN(annual_salary) AS minimum_salary,
        MAX(annual_salary) AS maximum_salary
      FROM employees
      GROUP BY department, currency
      ORDER BY department, currency
    `)
    .all();
};

const getSalarySummaryByCountry = () => {
  return db
    .prepare(`
      SELECT
        country,
        currency,
        COUNT(*) AS employee_count,
        SUM(annual_salary) AS total_payroll,
        ROUND(AVG(annual_salary), 2) AS average_salary,
        MIN(annual_salary) AS minimum_salary,
        MAX(annual_salary) AS maximum_salary
      FROM employees
      GROUP BY country, currency
      ORDER BY country, currency
    `)
    .all();
};

module.exports = {
  getTotalEmployeeCount,
  getSalarySummaryByCurrency,
  getSalarySummaryByDepartment,
  getSalarySummaryByCountry,
};