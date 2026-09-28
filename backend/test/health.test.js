process.env.DATABASE_PATH = "/tmp/salary-management-test.db";

const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");

const app = require("../src/app");

test("GET /api/health returns API health status", async () => {
  const response = await request(app)
    .get("/api/health")
    .expect(200);

  assert.deepEqual(response.body, {
    status: "ok",
    message: "Salary Management API is running",
  });
});