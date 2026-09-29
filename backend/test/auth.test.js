process.env.HR_EMAIL = "hr@acme.com";
process.env.HR_PASSWORD = "test-password";
process.env.JWT_SECRET = "test-jwt-secret";

const test = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");

const app = require("../src/app");

test("POST /api/auth/login returns token for valid credentials", async () => {
  const response = await request(app)
    .post("/api/auth/login")
    .send({
      email: "hr@acme.com",
      password: "test-password",
    })
    .expect(200);

  assert.equal(
    response.body.user.email,
    "hr@acme.com"
  );

  assert.equal(
    response.body.user.role,
    "HR Manager"
  );

  assert.ok(response.body.token);
});

test("POST /api/auth/login rejects invalid credentials", async () => {
  const response = await request(app)
    .post("/api/auth/login")
    .send({
      email: "hr@acme.com",
      password: "wrong-password",
    })
    .expect(401);

  assert.equal(
    response.body.error,
    "Invalid email or password"
  );
});

test("GET /api/employees requires authentication", async () => {
  const response = await request(app)
    .get("/api/employees")
    .expect(401);

  assert.equal(
    response.body.error,
    "Authentication required"
  );
});

test("GET /api/employees rejects invalid token", async () => {
  const response = await request(app)
    .get("/api/employees")
    .set(
      "Authorization",
      "Bearer invalid-token"
    )
    .expect(401);

  assert.equal(
    response.body.error,
    "Invalid or expired token"
  );
});