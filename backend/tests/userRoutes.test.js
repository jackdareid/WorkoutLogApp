const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../app");
const config = require("../config");
const { setupTestData, endTesting } = require("./testHelper");

beforeAll(async () => {
  await setupTestData();
});

// Test structure:
// 1. Arrange: Choose invalid credentials
// 2. Act: Send request
// 4. Assert: expect certain outcome

// signupUser
it("returns 201 with a successful signup", async () => {
  const response = await request(app).post("/api/user/signup").send({
    f_name: "Rocky",
    l_name: "TheAlien",
    email: "notyetused@email.com",
    password: "SuperFake",
  });
  expect(response.status).toBe(201);
  expect(response.body.message).toBe("Successfully created user");
});

it("returns 409 when email is already in use", async () => {
  const response = await request(app).post("/api/user/signup").send({
    f_name: "Rocky",
    l_name: "TheAlien",
    email: "notyetused@email.com",
    password: "SuperFake",
  });
  expect(response.status).toBe(409);
  expect(response.body.message).toBe("Email already in use");
});

// loginUser
it("returns 200 when user successfully logs in", async () => {
  const response = await request(app).post("/api/user/login").send({
    email: "notyetused@email.com",
    password: "SuperFake",
  });
  expect(response.status).toBe(200);
  expect(response.body.message).toBe("Login successful");
});

it("returns 401 when the login credentials are invalid", async () => {
  const response = await request(app).post("/api/user/login").send({
    email: "fake_email_123@example.com",
    password: "incorrect_password",
  });
  expect(response.status).toBe(401);
  expect(response.body.message).toBe("Invalid email or password");
});

it("returns exact same as above when email is correct and password incorrect", async () => {
  const response = await request(app).post("/api/user/login").send({
    email: "notyetused@email.com",
    password: "fake_password",
  });
  expect(response.status).toBe(401);
  expect(response.body.message).toBe("Invalid email or password");
});

// getMe
it("returns 200 when a user is successfully retrieved", async () => {
  const loginRequest = await request(app).post("/api/user/login").send({
    email: "test@example.com",
    password: "password123",
  });
  const token = loginRequest.body.token;

  const response = await request(app)
    .get("/api/user/me")
    .set("Authorization", `Bearer ${token}`);
  expect(response.status).toBe(200);
  expect(response.body.message).toBe("User found");
});

it("returns 404 if user_id not found", async () => {
  const token = jwt.sign({ user_id: 999 }, config.auth.jwtSecret, {
    expiresIn: config.auth.jwtExpiresIn,
  });
  const response = await request(app)
    .get("/api/user/me")
    .set("Authorization", `Bearer ${token}`);
  expect(response.status).toBe(404);
  expect(response.body.message).toBe("User not found");
});

afterAll(async () => {
  endTesting();
});
