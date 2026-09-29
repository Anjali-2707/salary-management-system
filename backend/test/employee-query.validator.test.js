const test = require("node:test");
const assert = require("node:assert/strict");

const {
  validateEmployeeQuery,
} = require("../src/validators/employee-query.validator");

test("validateEmployeeQuery returns defaults when query is empty", () => {
  const result = validateEmployeeQuery({});

  assert.equal(result.error, undefined);

  assert.deepEqual(result.value, {
    page: 1,
    limit: 20,
    search: "",
    department: "",
    country: "",
    sortBy: "employeeId",
    sortOrder: "asc",
  });
});

test("validateEmployeeQuery accepts valid pagination, filters, and sorting", () => {
  const result = validateEmployeeQuery({
    page: "2",
    limit: "50",
    search: " Rahul ",
    department: " Engineering ",
    country: " India ",
    sortBy: "annualSalary",
    sortOrder: "DESC",
  });

  assert.equal(result.error, undefined);

  assert.deepEqual(result.value, {
    page: 2,
    limit: 50,
    search: "Rahul",
    department: "Engineering",
    country: "India",
    sortBy: "annualSalary",
    sortOrder: "desc",
  });
});

test("validateEmployeeQuery rejects page less than 1", () => {
  const result = validateEmployeeQuery({
    page: "0",
  });

  assert.equal(
    result.error,
    "page must be a positive integer"
  );
});

test("validateEmployeeQuery rejects limit greater than 100", () => {
  const result = validateEmployeeQuery({
    limit: "101",
  });

  assert.equal(
    result.error,
    "limit must be an integer between 1 and 100"
  );
});

test("validateEmployeeQuery rejects unsupported sort field", () => {
  const result = validateEmployeeQuery({
    sortBy: "salary",
  });

  assert.ok(result.error);
});

test("validateEmployeeQuery rejects invalid sort order", () => {
  const result = validateEmployeeQuery({
    sortOrder: "random",
  });

  assert.equal(
    result.error,
    "sortOrder must be either asc or desc"
  );
});