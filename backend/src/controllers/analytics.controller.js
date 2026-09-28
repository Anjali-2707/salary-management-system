const {
  getSalarySummary,
  getDepartmentSalarySummary,
  getCountrySalarySummary,
} = require("../services/analytics.service");

const getSummary = (req, res) => {
  const summary = getSalarySummary();

  return res.status(200).json(summary);
};

const getDepartmentSummary = (req, res) => {
  const summary = getDepartmentSalarySummary();

  return res.status(200).json({
    departments: summary,
  });
};

const getCountrySummary = (req, res) => {
  const summary = getCountrySalarySummary();

  return res.status(200).json({
    countries: summary,
  });
};

module.exports = {
  getSummary,
  getDepartmentSummary,
  getCountrySummary,
};