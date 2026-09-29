import {
  apiFetch,
} from "./apiClient";
const getSalarySummary = async ({
  signal,
} = {}) => {
  const response = await apiFetch(
    "/api/analytics/summary",
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
        "Failed to fetch salary summary"
    );
  }

  return response.json();
};

const getDepartmentSalarySummary = async ({
  signal,
} = {}) => {
  const response = await apiFetch(
    "/api/analytics/departments",
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
        "Failed to fetch department salary summary"
    );
  }

  return response.json();
};

const getCountrySalarySummary = async ({
  signal,
} = {}) => {
  const response = await apiFetch(
    "/api/analytics/countries",
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
        "Failed to fetch country salary summary"
    );
  }

  return response.json();
};

export {
  getSalarySummary,
  getDepartmentSalarySummary,
  getCountrySalarySummary
};