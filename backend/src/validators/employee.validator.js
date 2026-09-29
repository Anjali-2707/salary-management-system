const EMAIL_PATTERN =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CURRENCY_PATTERN =
  /^[A-Za-z]{3}$/;

const DATE_PATTERN =
  /^\d{4}-\d{2}-\d{2}$/;

const isValidDate = (value) => {
  if (!DATE_PATTERN.test(value)) {
    return false;
  }

  const [year, month, day] = value
    .split("-")
    .map(Number);

  const date = new Date(
    Date.UTC(year, month - 1, day)
  );

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
};

const validateEmployee = (employee = {}) => {
  const {
    employeeId,
    firstName,
    lastName,
    email,
    department,
    designation,
    country,
    currency,
    annualSalary,
    joiningDate,
  } = employee;

  if (
    typeof employeeId !== "string" ||
    !employeeId.trim()
  ) {
    return {
      error: "employeeId is required",
    };
  }

  if (
    typeof firstName !== "string" ||
    !firstName.trim()
  ) {
    return {
      error: "firstName is required",
    };
  }

  if (
    typeof lastName !== "string" ||
    !lastName.trim()
  ) {
    return {
      error: "lastName is required",
    };
  }

  if (
    typeof email !== "string" ||
    !email.trim()
  ) {
    return {
      error: "email is required",
    };
  }

  if (!EMAIL_PATTERN.test(email.trim())) {
    return {
      error: "email must be valid",
    };
  }

  if (
    typeof department !== "string" ||
    !department.trim()
  ) {
    return {
      error: "department is required",
    };
  }

  if (
    typeof designation !== "string" ||
    !designation.trim()
  ) {
    return {
      error: "designation is required",
    };
  }

  if (
    typeof country !== "string" ||
    !country.trim()
  ) {
    return {
      error: "country is required",
    };
  }

  if (
    typeof currency !== "string" ||
    !currency.trim()
  ) {
    return {
      error: "currency is required",
    };
  }

  if (
    !CURRENCY_PATTERN.test(
      currency.trim()
    )
  ) {
    return {
      error:
        "currency must be a 3-letter code",
    };
  }

  const salary = Number(annualSalary);

  if (
    !Number.isFinite(salary) ||
    salary < 0
  ) {
    return {
      error:
        "annualSalary must be a non-negative number",
    };
  }

  if (
    typeof joiningDate !== "string" ||
    !joiningDate.trim()
  ) {
    return {
      error: "joiningDate is required",
    };
  }

  if (!isValidDate(joiningDate.trim())) {
    return {
      error:
        "joiningDate must be a valid date in YYYY-MM-DD format",
    };
  }

  return {
    value: {
      employeeId: employeeId.trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      department: department.trim(),
      designation: designation.trim(),
      country: country.trim(),
      currency: currency
        .trim()
        .toUpperCase(),
      annualSalary: salary,
      joiningDate: joiningDate.trim(),
    },
  };
};

module.exports = {
  validateEmployee,
};