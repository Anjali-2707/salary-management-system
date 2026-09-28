const getEmployees = async ({
  page = 1,
  limit = 20,
  search = "",
  department = "",
  country = "",
  sortBy = "employeeId",
  sortOrder = "asc",
  signal,
} = {}) => {
  const queryParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sortBy,
    sortOrder,
  });

  if (search) {
    queryParams.set("search", search);
  }

  if (department) {
    queryParams.set("department", department);
  }

  if (country) {
    queryParams.set("country", country);
  }

  const response = await fetch(
    `/api/employees?${queryParams.toString()}`,
    {
      signal,
    }
  );

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => null);

    throw new Error(
      errorData?.error ||
        "Failed to fetch employees"
    );
  }

  return response.json();
};

const getEmployeeFilterOptions = async ({
  signal,
} = {}) => {
  const response = await fetch(
    "/api/employees/filter-options",
    {
      signal,
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch employee filter options"
    );
  }

  return response.json();
};

export {
  getEmployees,
  getEmployeeFilterOptions,
};
