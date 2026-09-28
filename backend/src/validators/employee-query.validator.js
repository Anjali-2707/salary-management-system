const ALLOWED_SORT_FIELDS = [
  "employeeId",
  "firstName",
  "lastName",
  "department",
  "country",
  "annualSalary",
  "joiningDate",
];

const ALLOWED_SORT_ORDERS = ["asc", "desc"];

const validateEmployeeQuery = (query) => {
  const page = query.page === undefined ? 1 : Number(query.page);
  const limit = query.limit === undefined ? 20 : Number(query.limit);

  const search = query.search?.trim() || "";
  const department = query.department?.trim() || "";
  const country = query.country?.trim() || "";

  const sortBy = query.sortBy || "employeeId";
  const sortOrder = (query.sortOrder || "asc").toLowerCase();

  if (!Number.isInteger(page) || page < 1) {
    return {
      error: "page must be a positive integer",
    };
  }

  if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
    return {
      error: "limit must be an integer between 1 and 100",
    };
  }

  if (!ALLOWED_SORT_FIELDS.includes(sortBy)) {
    return {
      error: `sortBy must be one of: ${ALLOWED_SORT_FIELDS.join(", ")}`,
    };
  }

  if (!ALLOWED_SORT_ORDERS.includes(sortOrder)) {
    return {
      error: "sortOrder must be either asc or desc",
    };
  }

  return {
    value: {
      page,
      limit,
      search,
      department,
      country,
      sortBy,
      sortOrder,
    },
  };
};

module.exports = {
  validateEmployeeQuery,
};