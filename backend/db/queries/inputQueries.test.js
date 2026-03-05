// inputQueries.test.js
const { setupTestData } = require("../../tests/testHelper.js");
const { addProgramWorkout } = require("./inputQueries.js");
const pool = require("../poolConnection.js");

describe("addProgramWorkout", () => {
  // Reset db before each test
  beforeEach(async () => {
    await setupTestData();
  });

  // Close pool once tests are done
  afterAll(async () => {
    await pool.end();
  });

  // Test 1 - Happy path
  const t1_text = "This test should successfully link a workout to a program.";
  test(t1_text, async () => {
    const program_id = 1;
    const workout_id = 1;
    const user_id = 1;

    const result = await addProgramWorkout(program_id, workout_id, user_id);

    // Assertions
    expect(result).toBeDefined();
    expect(result.program_id).toBe(program_id);
    expect(result.workout_id).toBe(workout_id);
    expect(result.user_id).toBe(user_id);
  });
});
