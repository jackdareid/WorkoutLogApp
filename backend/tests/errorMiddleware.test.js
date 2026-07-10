const request = require("supertest");
const app = require("../app");

// Test structure:
// 1. Arrange: Choose invalid credentials
// 2. Act: Send request
// 4. Assert: expect certain outcome

// loginUser
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
    email: "jackdareid@gmail.com",
    password: "fake_password",
  });
  expect(response.status).toBe(401);
  expect(response.body.message).toBe("Invalid email or password");
});
