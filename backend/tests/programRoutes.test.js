const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../app");
const config = require("../config");
const { setupTestData } = require("./testHelper");

beforeAll(async () => {
  await setupTestData();
});

// Test structure:
// 1. Arrange: Choose invalid credentials
// 2. Act: Send request
// 4. Assert: expect certain outcome

// retrieveProgram
it("returns status code 200 on successful retrieval", async () => {
  const loginRequest = await request(app).post("/api/user/login").send({
    email: "test@example.com",
    password: "password123",
  });
  const token = loginRequest.body.token;
  const response = await request(app)
    .get("/api/programs/")
    .set("Authorization", `Bearer ${token}`);
  expect(response.status).toBe(200);
  expect(Array.isArray(response.body.data)).toBe(true);
});

it("returns status code 500 on failed retrieval", async () => {});

// makeProgram
// it("returns status code 201 on successful program creation", async () => {
//   const response = await request(app).post("/api/programs/create").send({
//     user_id: 1,
//     programName: "Test Program",
//     programDesc: "This is a test program",
//   });
//
// });
