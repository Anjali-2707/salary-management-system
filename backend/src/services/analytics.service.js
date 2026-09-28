const {
  getTotalEmployeeCount,
  getSalarySummaryByCurrency,
  getSalarySummaryByDepartment,
  getSalarySummaryByCountry,
} = require("../repositories/analytics.repository");

const getSalarySummary = () => {
  const totalEmployees = getTotalEmployeeCount();

  const salarySummary = getSalarySummaryByCurrency();

  return {
    totalEmployees,

    salaryByCurrency: salarySummary.map((item) => ({
      currency: item.currency,
      employeeCount: item.employee_count,
      totalPayroll: item.total_payroll,
      averageSalary: item.average_salary,
      minimumSalary: item.minimum_salary,
      maximumSalary: item.maximum_salary,
    })),
  };
};

const getDepartmentSalarySummary = () => {
  const result = getSalarySummaryByDepartment();

  return result.map((item) => ({
    department: item.department,
    currency: item.currency,
    employeeCount: item.employee_count,
    totalPayroll: item.total_payroll,
    averageSalary: item.average_salary,
    minimumSalary: item.minimum_salary,
    maximumSalary: item.maximum_salary,
  }));
};

const getCountrySalarySummary = () => {
  const result = getSalarySummaryByCountry();

  return result.map((item) => ({
    country: item.country,
    currency: item.currency,
    employeeCount: item.employee_count,
    totalPayroll: item.total_payroll,
    averageSalary: item.average_salary,
    minimumSalary: item.minimum_salary,
    maximumSalary: item.maximum_salary,
  }));
};

module.exports = {
    getSalarySummary,
    getDepartmentSalarySummary,
    getCountrySalarySummary,
};