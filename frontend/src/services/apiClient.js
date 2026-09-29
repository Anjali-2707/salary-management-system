const apiFetch = async (
  url,
  options = {}
) => {
  const token = localStorage.getItem(
    "salaryManagementToken"
  );

  const headers = new Headers(
    options.headers || {}
  );

  if (token) {
    headers.set(
      "Authorization",
      `Bearer ${token}`
    );
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    localStorage.removeItem(
      "salaryManagementToken"
    );

    localStorage.removeItem(
      "salaryManagementUser"
    );

    window.dispatchEvent(
      new Event("auth:unauthorized")
    );
  }

  return response;
};

export {
  apiFetch,
};