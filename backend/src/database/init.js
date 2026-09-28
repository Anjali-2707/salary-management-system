const db = require("./db");

const initializeDatabase = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY,

      employee_id TEXT NOT NULL UNIQUE,

      first_name TEXT NOT NULL,

      last_name TEXT NOT NULL,

      email TEXT NOT NULL UNIQUE,

      department TEXT NOT NULL,

      designation TEXT NOT NULL,

      country TEXT NOT NULL,

      currency TEXT NOT NULL,

      annual_salary INTEGER NOT NULL
        CHECK (annual_salary >= 0),

      joining_date TEXT NOT NULL,

      created_at TEXT NOT NULL
        DEFAULT CURRENT_TIMESTAMP,

      updated_at TEXT NOT NULL
        DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log("Database initialized successfully");
};

module.exports = initializeDatabase;