const getEmployees = async ({
  page = 1,
  limit = 20,
  search = "",
  signal,
} = {}) => {
  const queryParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (search) {
    queryParams.set("search", search);
  }

  const response = await fetch(
    `/api/employees?${queryParams.toString()}`,
    {
      signal,
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.error || "Failed to fetch employees"
    );
  }

  return response.json();
};

export {
  getEmployees,
};