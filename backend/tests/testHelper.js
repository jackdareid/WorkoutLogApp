const pool = require("../db/poolConnection.js");
const bcrypt = require("bcrypt");

/**
 * Clears the test database and resets it to a known state.
 */
const setupTestData = async () => {
  try {
    // 1. Clear existing data
    await pool.query(
      `TRUNCATE 
        users, 
        programs, 
        workouts, 
        program_workouts, 
        exercises, 
        workout_exercises, 
        workout_completed, 
        completed_exercises, 
        completed_sets, 
        user_exercise_stats 
      RESTART IDENTITY CASCADE`,
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
      INSERT INTO program_workouts (program_id, workout_id)
      VALUES ($1, $2)
      RETURNING *;
    `;
    await pool.query(pw_script, [1, 1]);

    // -------------- Exercises --------------
    const exercise_script = `
      INSERT INTO exercises (name, muscle_group)
      VALUES       
      ('Bench Press', 'Chest'),
      ('Incline Dumbbell Press', 'Chest'),
      ('Chest Fly', 'Chest'),
      ('Squat', 'Legs'),
      ('Leg Press', 'Legs'), --5
      ('Leg Extension', 'Legs'),
      ('Leg Curl', 'Legs'),
      ('Deadlift', 'Back'),
      ('Pull Up', 'Back'),
      ('Barbell Row', 'Back'), --10
      ('Overhead Press', 'Shoulders'),
      ('Lateral Raise', 'Shoulders'),
      ('Dumbbell Curl', 'Arms'),
      ('Tricep Pushdown', 'Arms'),
      ('Plank', 'Core'); --15
    `;
    await pool.query(exercise_script);

    // -------------- Workout Exercises --------------
    const workout_exercise_script = `
      INSERT INTO workout_exercises
      (workout_id, exercise_id, order_index, target_sets, target_reps, target_weight, target_duration, rest, time_flag, distance, notes)
      VALUES
      ($1, 1, 1, 3, 10, 225.00, NULL, 90, FALSE, NULL, 'No notes'), -- Bench press
      ($1, 15, 2, 2, NULL, NULL, 60, 30, TRUE, NULL, 'Keep your butt up!');
    `;

    await pool.query(workout_exercise_script, [1]);

    // -------------- Completed Workout --------------
    const comp_workout_script = `
      INSERT INTO workout_completed 
      (user_id, workout_id, notes)
      VALUES (1, 1, 'Super strong');
    `;
    await pool.query(comp_workout_script);

    // -------------- Completed Exercises --------------
    const comp_exercise_script = `
      INSERT INTO completed_exercises
      (user_id, exercise_id, workout_completed_id, time_flag, notes)
      VALUES 
      (1, 1, 1, FALSE, 'Completed!'),
      (1, 15, 1, TRUE, 'Pain and suffering');
    `;
    await pool.query(comp_exercise_script);

    // -------------- Completed Set --------------
    const cs_script = `
      INSERT INTO completed_sets (completed_exercise_id, weight, reps, distance, duration, rpe, set_number)
      VALUES (1, 225.5, 10, NULL, NULL, 8.5, 1),
      (1, 225.5, 9, NULL, NULL, 9, 2),
      (2, NULL, NULL, NULL, 60, 5, 1),
      (2, NULL, NULL, NULL, 60, 5.5, 2);
    `;
    await pool.query(cs_script);

    console.log("Test database seeded successfully with crazy crazy data.");
  } catch (err) {
    console.error("Error seeding test database:", err);
  }
};

setupTestData();

module.exports = { setupTestData };
