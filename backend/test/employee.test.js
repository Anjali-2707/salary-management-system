process.env.DATABASE_PATH = "/tmp/salary-management-employee-test.db";
process.env.HR_EMAIL = "hr@acme.com";
process.env.HR_PASSWORD = "test-password";
process.env.JWT_SECRET = "test-jwt-secret";

const fs = require("fs");
const {
  test,
  before,
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

let authToken;

before(async () => {
  const response = await request(app)
    .post("/api/auth/login")
    .send({
      email: process.env.HR_EMAIL,
      password: process.env.HR_PASSWORD,
    })
    .expect(200);

  authToken = response.body.token;
});

const employeeOne = {
  employeeId: "TEST001",
  firstName: "Anjali",
  lastName: "Sharma",
  email: "anjali.test@acme.com",
  department: "Engineering",
  designation: "Software Engineer",
  country: "India",
  currency: "INR",
  annualSalary: 1500000,
  joiningDate: "2024-01-10",
};

const employeeTwo = {
  employeeId: "TEST002",
  firstName: "Rahul",
  lastName: "Verma",
  email: "rahul.test@acme.com",
  department: "Finance",
  designation: "Finance Manager",
  country: "India",
  currency: "INR",
  annualSalary: 1800000,
  joiningDate: "2023-06-15",
};

const employeeThree = {
  employeeId: "TEST003",
  firstName: "John",
  lastName: "Smith",
  email: "john.test@acme.com",
  department: "Engineering",
  designation: "Software Engineer",
  country: "United States",
  currency: "USD",
  annualSalary: 90000,
  joiningDate: "2022-05-20",
};

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
});

test("GET /api/employees returns employees", async () => {
  addEmployee(employeeOne);
  addEmployee(employeeTwo);

  const response = await request(app)
    .get("/api/employees")
    .set(
    "Authorization",
    `Bearer ${authToken}`
  )
    .expect(200);

  assert.equal(response.body.employees.length, 2);
  assert.equal(response.body.pagination.total, 2);

  assert.equal(
    response.body.employees[0].employee_id,
    "TEST001"
  );
});

test("GET /api/employees supports pagination", async () => {
  addEmployee(employeeOne);
  addEmployee(employeeTwo);

  const response = await request(app)
    .get("/api/employees?page=2&limit=1")
    .set(
    "Authorization",
    `Bearer ${authToken}`
  )
    .expect(200);

  assert.equal(response.body.employees.length, 1);
  assert.equal(response.body.pagination.page, 2);
  assert.equal(response.body.pagination.limit, 1);
  assert.equal(response.body.pagination.total, 2);
  assert.equal(response.body.pagination.totalPages, 2);

  assert.equal(
    response.body.employees[0].employee_id,
    "TEST002"
  );
});

test("GET /api/employees rejects invalid page", async () => {
  const response = await request(app)
    .get("/api/employees?page=-1")
    .set(
      "Authorization",
      `Bearer ${authToken}`
    )
    .expect(400);

  assert.equal(
    response.body.error,
    "page must be a positive integer"
  );
});

test("POST /api/employees creates an employee", async () => {
  const response = await request(app)
    .post("/api/employees")
    .set(
    "Authorization",
    `Bearer ${authToken}`
  )
    .send(employeeOne)
    .expect(201);

  assert.equal(
    response.body.employee_id,
    employeeOne.employeeId
  );

  assert.equal(
    response.body.first_name,
    employeeOne.firstName
  );

  assert.equal(
    response.body.annual_salary,
    employeeOne.annualSalary
  );

  const result = db
    .prepare(`
      SELECT COUNT(*) AS total
      FROM employees
    `)
    .get();

  assert.equal(result.total, 1);
});

test("POST /api/employees rejects duplicate employee ID", async () => {
  addEmployee(employeeOne);

  const duplicateEmployee = {
    ...employeeTwo,
    employeeId: employeeOne.employeeId,
  };

  const response = await request(app)
    .post("/api/employees")
    .set(
    "Authorization",
    `Bearer ${authToken}`
  )
    .send(duplicateEmployee)
    .expect(409);

  assert.equal(
    response.body.error,
    "Employee ID or email already exists"
  );
});

test("GET /api/employees/filter-options returns unique departments and countries", async () => {
  addEmployee(employeeOne);
  addEmployee(employeeTwo);
  addEmployee(employeeThree);

  const response = await request(app)
    .get("/api/employees/filter-options")
    .set(
    "Authorization",
    `Bearer ${authToken}`
  )
    .expect(200);

  assert.deepEqual(
    response.body.departments,
    [
      "Engineering",
      "Finance",
    ]
  );

  assert.deepEqual(
    response.body.countries,
    [
      "India",
      "United States",
    ]
  );
});

test("GET /api/employees applies department and country filters together", async () => {
  addEmployee(employeeOne);
  addEmployee(employeeTwo);
  addEmployee(employeeThree);

  const response = await request(app)
    .get(
      "/api/employees?department=Engineering&country=India"
    )
    .set(
    "Authorization",
    `Bearer ${authToken}`
  )
    .expect(200);

  assert.equal(
    response.body.employees.length,
    1
  );

  assert.equal(
    response.body.pagination.total,
    1
  );

  assert.equal(
    response.body.employees[0].employee_id,
    "TEST001"
  );
});

after(() => {
  db.close();

  if (fs.existsSync(testDatabasePath)) {
    fs.unlinkSync(testDatabasePath);
  }
});