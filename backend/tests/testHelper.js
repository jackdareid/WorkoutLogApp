const pool = require("../db/poolConnection.js");
const bcrypt = require("bcrypt");

/**
 * Clears the test database and resets it to a known state.
 */
const setupTestData = async () => {
  try {
    // 1. Clear existing data
    await pool.query(
      "TRUNCATE users, programs, workouts, program_workouts RESTART IDENTITY CASCADE",
    );
    const password = "password123";
    const hashed_password = await bcrypt.hash(password, 10);

    // 2. Insert fresh data
    // User
    const user_script = `
      INSERT INTO users (f_name, l_name, email, password_hash) 
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const user_values = ["Test", "User", "test@example.com", hashed_password];

    await pool.query(user_script, user_values);

    // Program
    const program_script = `
      INSERT INTO programs (user_id, name, notes)
      VALUES ($1, $2, $3);
    `;
    const program_values = [1, "Test Program", "Test program notes"];

    await pool.query(program_script, program_values);

    // Workout
    const workout_script = `
      INSERT INTO workouts (user_id, name, notes)
      VALUES ($1, $2, $3);
    `;
    const workout_values = [1, "Test Workout", "Test workout notes"];

    await pool.query(workout_script, workout_values);

    console.log("Test database seeded successfully.");
  } catch (err) {
    console.error("Error seeding test database:", err);
  }
};

module.exports = { setupTestData };
