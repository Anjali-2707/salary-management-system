process.env.DATABASE_PATH = "/tmp/salary-management-analytics-test.db";

const fs = require("fs");

const {
  test,
  beforeEach,
  after,
} = require("node:test");

const assert = require("node:assert/strict");
const request = require("supertest");

const testDatabasePath = process.env.DATABASE_PATH;

if (fs.existsSync(testDatabasePath)) {
  fs.unlinkSync(testDatabasePath);
}

const initializeDatabase = require("../src/database/init");
const db = require("../src/database/db");
const app = require("../src/app");

initializeDatabase();

const insertEmployee = db.prepare(`
  INSERT INTO employees (
    employee_id,
    first_name,
    last_name,
    email,
    department,
    designation,
    country,
    currency,
    annual_salary,
    joining_date
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

const employees = [
  {
    employeeId: "AN001",
    firstName: "Anjali",
    lastName: "Sharma",
    email: "anjali.analytics@acme.com",
    department: "Engineering",
    designation: "Software Engineer",
    country: "India",
    currency: "INR",
    annualSalary: 1000000,
    joiningDate: "2024-01-01",
  },

  {
    employeeId: "AN002",
    firstName: "Rahul",
    lastName: "Verma",
    email: "rahul.analytics@acme.com",
    department: "Engineering",
    designation: "Senior Software Engineer",
    country: "India",
    currency: "INR",
    annualSalary: 2000000,
    joiningDate: "2023-01-01",
  },

  {
    employeeId: "AN003",
    firstName: "John",
    lastName: "Smith",
    email: "john.analytics@acme.com",
    department: "Engineering",
    designation: "Software Engineer",
    country: "United States",
    currency: "USD",
    annualSalary: 80000,
    joiningDate: "2022-01-01",
  },

  {
    employeeId: "AN004",
    firstName: "Emma",
    lastName: "Brown",
    email: "emma.analytics@acme.com",
    department: "Finance",
    designation: "Finance Manager",
    country: "United States",
    currency: "USD",
    annualSalary: 120000,
    joiningDate: "2021-01-01",
  },
];

const addEmployee = (employee) => {
  insertEmployee.run(
    employee.employeeId,
    employee.firstName,
    employee.lastName,
    employee.email,
    employee.department,
    employee.designation,
    employee.country,
    employee.currency,
    employee.annualSalary,
    employee.joiningDate
  );
};

beforeEach(() => {
  db.prepare("DELETE FROM employees").run();

  employees.forEach((employee) => {
    addEmployee(employee);
  });
});

test("GET /api/analytics/summary returns salary summary by currency", async () => {
  const response = await request(app)
    .get("/api/analytics/summary")
    .expect(200);

  assert.equal(
    response.body.totalEmployees,
    4
  );

  assert.equal(
    response.body.salaryByCurrency.length,
    2
  );

  const inrSummary =
    response.body.salaryByCurrency.find(
      (item) => item.currency === "INR"
    );

  assert.equal(inrSummary.employeeCount, 2);
  assert.equal(inrSummary.totalPayroll, 3000000);
  assert.equal(inrSummary.averageSalary, 1500000);
  assert.equal(inrSummary.minimumSalary, 1000000);
  assert.equal(inrSummary.maximumSalary, 2000000);

  const usdSummary =
    response.body.salaryByCurrency.find(
      (item) => item.currency === "USD"
    );

  assert.equal(usdSummary.employeeCount, 2);
  assert.equal(usdSummary.totalPayroll, 200000);
  assert.equal(usdSummary.averageSalary, 100000);
});

test("GET /api/analytics/departments returns salary statistics by department and currency", async () => {
  const response = await request(app)
    .get("/api/analytics/departments")
    .expect(200);

  const engineeringInr =
    response.body.departments.find(
      (item) =>
        item.department === "Engineering" &&
        item.currency === "INR"
    );

  assert.ok(engineeringInr);

  assert.equal(
    engineeringInr.employeeCount,
    2
  );

  assert.equal(
    engineeringInr.totalPayroll,
    3000000
  );

  assert.equal(
    engineeringInr.averageSalary,
    1500000
  );

  const engineeringUsd =
    response.body.departments.find(
      (item) =>
        item.department === "Engineering" &&
        item.currency === "USD"
    );

  assert.ok(engineeringUsd);

  assert.equal(
    engineeringUsd.employeeCount,
    1
  );

  assert.equal(
    engineeringUsd.averageSalary,
    80000
  );
});

test("GET /api/analytics/countries returns salary statistics by country and currency", async () => {
  const response = await request(app)
    .get("/api/analytics/countries")
    .expect(200);

  const india =
    response.body.countries.find(
      (item) =>
        item.country === "India" &&
        item.currency === "INR"
    );

  assert.ok(india);

  assert.equal(
    india.employeeCount,
    2
  );

  assert.equal(
    india.totalPayroll,
    3000000
  );

  assert.equal(
    india.averageSalary,
    1500000
  );

  const unitedStates =
    response.body.countries.find(
      (item) =>
        item.country === "United States" &&
        item.currency === "USD"
    );

  assert.ok(unitedStates);

  assert.equal(
    unitedStates.employeeCount,
    2
  );

  assert.equal(
    unitedStates.totalPayroll,
    200000
  );

  assert.equal(
    unitedStates.averageSalary,
    100000
  );
});

after(() => {
  db.close();

  if (fs.existsSync(testDatabasePath)) {
    fs.unlinkSync(testDatabasePath);
  }
});