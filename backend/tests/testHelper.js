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
    // -------------- User --------------
    const user_script = `
      INSERT INTO users (f_name, l_name, email, password_hash) 
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const user_values = ["Test", "User", "test@example.com", hashed_password];

    await pool.query(user_script, user_values);

    // -------------- Program --------------
    const program_script = `
      INSERT INTO programs (user_id, name, notes)
      VALUES ($1, $2, $3);
    `;
    const program_values = [1, "Test Program", "Test program notes"];

    await pool.query(program_script, program_values);

    // -------------- Workout --------------
    const workout_script = `
      INSERT INTO workouts (user_id, name, notes)
      VALUES ($1, $2, $3);
    `;
    const workout_values = [1, "Test Workout", "Test workout notes"];

    await pool.query(workout_script, workout_values);

    // -------------- Program Workout --------------
    const pw_script = `
      INSERT INTO program_workouts (program_id, workout_id, user_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    await pool.query(pw_script, [1, 1, 1]);

    // -------------- Exercise --------------
    const exercise_script = `
      INSERT INTO exercises (name, muscle_group)
      VALUES       
      ('Bench Press', 'Chest'),
      ('Incline Dumbbell Press', 'Chest'),
      ('Chest Fly', 'Chest'),
      ('Squat', 'Legs'),
      ('Leg Press', 'Legs'),
      ('Leg Extension', 'Legs'),
      ('Leg Curl', 'Legs'),
      ('Deadlift', 'Back'),
      ('Pull Up', 'Back'),
      ('Barbell Row', 'Back'),
      ('Overhead Press', 'Shoulders'),
      ('Lateral Raise', 'Shoulders'),
      ('Dumbbell Curl', 'Arms'),
      ('Tricep Pushdown', 'Arms'),
      ('Plank', 'Core');
    `;

    await pool.query(exercise_script);

    // -------------- Completed Workout --------------
    const comp_workout_script = `
      INSERT INTO workout_completed 
      (user_id, workout_id, notes)
      VALUES (1, 1, 'No notes');
    `;
    await pool.query(comp_workout_script);

    // -------------- Completed Exercises --------------
    const comp_exercise_script = `
      INSERT INTO completed_exercises
      (user_id, exercise_id, workout_completed_id, time_flag, notes)
      VALUES (1, 1, 1, FALSE, 'Completed!');
    `;
    await pool.query(comp_exercise_script);

    // -------------- Completed Set --------------
    const cs_script = `
      INSERT INTO completed_sets (completed_exercise_id, weight, reps, rpe, set_number)
      VALUES (1, 225, 10, 5, 2)
      RETURNING *;
    `;
    await pool.query(cs_script);

    // console.log("Test database seeded successfully.");
  } catch (err) {
    console.error("Error seeding test database:", err);
  }
};

module.exports = { setupTestData };
