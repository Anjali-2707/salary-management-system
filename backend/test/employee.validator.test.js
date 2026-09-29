const test = require("node:test");
const assert = require("node:assert/strict");

const {
  validateEmployee,
} = require("../src/validators/employee.validator");

const validEmployee = {
  employeeId: "EMPTEST001",
  firstName: "Rahul",
  lastName: "Sharma",
  email: "rahul.sharma@acme.com",
  department: "Engineering",
  designation: "Software Engineer",
  country: "India",
  currency: "inr",
  annualSalary: "1500000",
  joiningDate: "2025-01-10",
};

test("validateEmployee accepts and normalizes valid employee data", () => {
  const result = validateEmployee(validEmployee);

  assert.equal(result.error, undefined);

  assert.deepEqual(result.value, {
    employeeId: "EMPTEST001",
    firstName: "Rahul",
    lastName: "Sharma",
    email: "rahul.sharma@acme.com",
    department: "Engineering",
    designation: "Software Engineer",
    country: "India",
    currency: "INR",
    annualSalary: 1500000,
    joiningDate: "2025-01-10",
  });
});

test("validateEmployee rejects a missing first name", () => {
  const result = validateEmployee({
    ...validEmployee,
    firstName: "",
  });

  assert.ok(result.error);
});

test("validateEmployee rejects a negative salary", () => {
  const result = validateEmployee({
    ...validEmployee,
    annualSalary: -1,
  });

  assert.ok(result.error);
});

test("validateEmployee rejects a missing joining date", () => {
  const result = validateEmployee({
    ...validEmployee,
    joiningDate: "",
  });

  assert.ok(result.error);
});