const getEmployees = async ({
  page = 1,
  limit = 20,
  signal,
} = {}) => {
  const queryParams = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

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