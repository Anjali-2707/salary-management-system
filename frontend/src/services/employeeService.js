import {
  apiFetch,
} from "./apiClient";
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

  const response = await apiFetch(
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
  const response = await apiFetch(
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

const getEmployeeById = async (id, { signal } = {}) => {
  const response = await apiFetch(
    `/api/employees/${id}`,
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
        "Failed to fetch employee"
    );
  }

  return response.json();
};

const createEmployee = async (employee) => {
  const response = await apiFetch("/api/employees", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(employee),
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => null);

    throw new Error(
      errorData?.error ||
        "Failed to create employee"
    );
  }

  return response.json();
};

const updateEmployee = async (
  id,
  employee
) => {
  const response = await apiFetch(
    `/api/employees/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(employee),
    }
  );

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => null);

    throw new Error(
      errorData?.error ||
        "Failed to update employee"
    );
  }

  return response.json();
};

const deleteEmployee = async (id) => {
  const response = await apiFetch(
    `/api/employees/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => null);

    throw new Error(
      errorData?.error ||
        "Failed to delete employee"
    );
  }
};

export {
  getEmployees,
  getEmployeeFilterOptions,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
};
