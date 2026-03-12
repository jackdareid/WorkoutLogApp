// tests/updateQueries.test.js
const { setupTestData } = require("./testHelper.js");
const { removeProgramWorkout } = require("../db/queries/updateQueries.js");
const pool = require("../db/poolConnection.js");

// General test formula:
// 1. Create test with test description
// 2. Use function in whatever stress testy way you need
// 3.happy Make assertions about the info that will be returned
// 3.unhappy Predict and catch error response

// Use AAA formula: Arrange --> Act --> Assert

// Global test specs

// Reset db before each test
beforeEach(async () => {
  await setupTestData();
});

afterAll(async () => {
  await pool.end();
});

describe("removeProgramWorkout", () => {
  test("Should remove a workout from a program", async () => {
    // Arrange
    const program_id = 1;
    const workout_id = 1;

    // Act
    const result = await removeProgramWorkout(program_id, workout_id);

    // Assert
    expect(result).toBe(true);
  });

  test("Should fail to remove workout because it doesn't exist", async () => {
    // Arrange
    const program_id = 1;
    const workout_id = 0; // Doesn't exist

    // Act
    const result = await removeProgramWorkout(program_id, workout_id);

    // Assert
    expect(result).toBe(false);
  });
});
