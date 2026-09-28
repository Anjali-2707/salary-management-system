const Database = require("better-sqlite3");
const fs = require("fs");
const path = require("path");

const databasePath =
  process.env.DATABASE_PATH ||
  path.join(__dirname, "../../data/salary-management.db");

fs.mkdirSync(path.dirname(databasePath), {
  recursive: true,
});

const db = new Database(databasePath);

db.pragma("foreign_keys = ON");

module.exports = db;