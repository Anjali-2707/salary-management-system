const db = require("./db");
const initializeDatabase = require("./init");

initializeDatabase();

const firstNames = [
  "Aarav",
  "Ananya",
  "Arjun",
  "Diya",
  "Ishaan",
  "Kavya",
  "Rahul",
  "Meera",
  "Rohan",
  "Priya",
];

const lastNames = [
  "Sharma",
  "Patel",
  "Singh",
  "Gupta",
  "Mehta",
  "Verma",
  "Kapoor",
  "Joshi",
  "Reddy",
  "Nair",
];

const departments = [
  "Engineering",
  "Finance",
  "Human Resources",
  "Sales",
  "Marketing",
  "Operations",
  "Product",
  "Customer Success",
];

const designations = [
  "Associate",
  "Specialist",
  "Senior Specialist",
  "Manager",
  "Senior Manager",
  "Director",
];

const locations = [
  {
    country: "India",
    currency: "INR",
    minimumSalary: 500000,
    salaryStep: 50000,
  },
  {
    country: "United States",
    currency: "USD",
    minimumSalary: 60000,
    salaryStep: 5000,
  },
  {
    country: "United Kingdom",
    currency: "GBP",
    minimumSalary: 40000,
    salaryStep: 3000,
  },
  {
    country: "Germany",
    currency: "EUR",
    minimumSalary: 45000,
    salaryStep: 3500,
  },
];

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

const seedEmployees = db.transaction(() => {
  db.prepare("DELETE FROM employees").run();

  for (let index = 1; index <= 10000; index++) {
    const firstName =
      firstNames[(index - 1) % firstNames.length];

    const lastName =
      lastNames[Math.floor((index - 1) / firstNames.length) % lastNames.length];

    const department =
      departments[(index - 1) % departments.length];

    const designation =
      designations[(index - 1) % designations.length];

    const location =
      locations[(index - 1) % locations.length];

    const salaryLevel = (index - 1) % 10;

    const annualSalary =
      location.minimumSalary +
      salaryLevel * location.salaryStep;

    const year = 2015 + ((index - 1) % 11);
    const month = String(((index - 1) % 12) + 1).padStart(2, "0");
    const day = String(((index - 1) % 28) + 1).padStart(2, "0");

    const joiningDate = `${year}-${month}-${day}`;

    const employeeId = `EMP${String(index).padStart(5, "0")}`;

    const email =
      `${firstName}.${lastName}.${index}@acme.com`.toLowerCase();

    insertEmployee.run(
      employeeId,
      firstName,
      lastName,
      email,
      department,
      designation,
      location.country,
      location.currency,
      annualSalary,
      joiningDate
    );
  }
});

seedEmployees();

console.log("Successfully seeded 10,000 employees.");