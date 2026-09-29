const getSalarySummary = async ({
  signal,
} = {}) => {
  const response = await fetch(
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

export {
  getSalarySummary,
};