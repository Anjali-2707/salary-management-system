const validateEmployee = (employee) => {
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

  if (!employeeId?.trim()) {
    return {
      error: "employeeId is required",
    };
  }

  if (!firstName?.trim()) {
    return {
      error: "firstName is required",
    };
  }

  if (!lastName?.trim()) {
    return {
      error: "lastName is required",
    };
  }

  if (!email?.trim()) {
    return {
      error: "email is required",
    };
  }

  if (!department?.trim()) {
    return {
      error: "department is required",
    };
  }

  if (!designation?.trim()) {
    return {
      error: "designation is required",
    };
  }

  if (!country?.trim()) {
    return {
      error: "country is required",
    };
  }

  if (!currency?.trim()) {
    return {
      error: "currency is required",
    };
  }

  const salary = Number(annualSalary);

  if (!Number.isFinite(salary) || salary < 0) {
    return {
      error: "annualSalary must be a non-negative number",
    };
  }

  if (!joiningDate?.trim()) {
    return {
      error: "joiningDate is required",
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
      currency: currency.trim().toUpperCase(),
      annualSalary: salary,
      joiningDate: joiningDate.trim(),
    },
  };
};

module.exports = {
  validateEmployee,
};