// retrievalQueries.test.js
const { setupTestData } = require("./testHelper.js");
const {
  getProgramWorkouts,
  getPreviousWorkout,
} = require("../db/queries/retrievalQueries.js");
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

describe("getProgramWorkouts", () => {
  test("Should return a programs workouts.", async () => {
    // Arrange
    const program_id = 1;

    // Act
    const result = (await getProgramWorkouts(program_id))[0];

    // Assert
    expect(result).toBeDefined();
    expect(result.workout_id).toBe(1);
    expect(result.user_id).toBe(1);
  });
});

describe("getPreviousWorkout", () => {
  test("Should get most recently completed workout of type workout_id", async () => {
    // Arrange
    const workout_id = 1;

    // Act
    const result = await getPreviousWorkout(workout_id);

    // Assert
    expect(result).toBeDefined();
  });
});
