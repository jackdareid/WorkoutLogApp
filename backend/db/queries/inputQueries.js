// db/queries/inputQueries.js
const pool = require("../poolConnection.js");
const bcrypt = require("bcrypt");

/**
 * This function creates a new user.
 * @async
 * @param {String} first_name - User's first name
 * @param {String} last_name - User's last name
 * @param {String} email - User's email
 * @param {String} password - User's password
 * @returns {Promise<Object>} - Created user instance
 * @throws {Error} If db fails to query.
 */
const createUser = async (first_name, last_name, email, password) => {
  const queryText = `
    INSERT INTO users (f_name, l_name, email, password_hash)
    VALUES
    ($1, $2, $3, $4)
    RETURNING f_name, l_name, date_joined, email;
  `;

  try {
    const hashed_password = await bcrypt.hash(password, 10);
    const values = [first_name, last_name, email, hashed_password];

    const res = await pool.query(queryText, values);
    return res.rows[0];
  } catch (err) {
    // 23505 is a Unique Violation error
    if (err.code === "23505") {
      console.error("User creation failed: email already exists");
    } else {
      console.error("Database error during user creation:", err.message);
    }

    throw err;
  }
};

/**
 * Creates a new program for a user.
 * @async
 * @param {number} user_id - Unique user id
 * @param {string} program_name - User's program name
 * @param {string} program_notes - Program's notes
 * @returns {Promise<Object>} Returns program instance
 * @throws {Error} If db fails to query
 */
const createProgram = async (user_id, program_name, program_notes) => {
  const queryText = `
    INSERT INTO programs (user_id, name, notes)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const values = [user_id, program_name, program_notes];

  try {
    const res = await pool.query(queryText, values);

    // Return program data
    return res.rows[0];
  } catch (err) {
    console.error("Program creation failed:", err.message);

    // Throw for API response
    throw err;
  }
};

/**
 * Creates a new workout
 * @async
 * @param {number} user_id - Unique user id
 * @param {string} workout_name - name of workout
 * @param {string} workout_notes - notes for workout
 * @returns {Promise<Object>} Returns workout instance
 * @throws {Error} Throws error if db fails to query
 */
const createWorkout = async (user_id, workout_name, workout_notes) => {
  const queryText = `
    INSERT INTO workouts (user_id, name, notes)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const values = [user_id, workout_name, workout_notes];

  try {
    const res = await pool.query(queryText, values);
    return res.rows[0];
  } catch (err) {
    console.error("Workout creation failed:", err.message);

    // Throw err for API response
    throw err;
  }
};

/**
 * Links a workout to a specific program in the database.
 * * @async
 * @param {number} program_id - Unique id of the program
 * @param {number} workout_id - Unique id of the workout
 * @param {number} user_id - Unique id of the user
 * @returns {Promise<Object>} The newly created relationship record
 * @throws {Error} Throws a 23505 error if the link already exists.
 */
const addProgramWorkout = async (program_id, workout_id, user_id) => {
  const queryText = `
    INSERT INTO program_workouts (program_id, workout_id, user_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const values = [program_id, workout_id, user_id];

  try {
    const res = await pool.query(queryText, values);
    return res.rows[0];
  } catch (err) {
    console.error("Link failed:", err.message);
    throw err;
  }
};

/**
 * Links an exercise to a user's workout.
 * * @async
 * @param {Object} workoutExerciseData - Exercise Details object
 * @returns {Promise<Object>}
 */
const createWorkoutExercises = async ({
  exercise_id,
  workout_id,
  order_index,
  sets,
  reps,
  rest = 60,
  time_f = false,
  distance = 0,
  notes = "",
}) => {
  const queryText = `
    INSERT INTO workout_exercises (
      workout_id, 
      exercise_id, 
      order_index, 
      target_sets, 
      target_reps, 
      rest, 
      time_flag, 
      distance, 
      notes
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
  `;

  const values = [
    workout_id,
    exercise_id,
    order_index,
    sets,
    reps,
    rest,
    time_f,
    distance,
    notes,
  ];

  try {
    const res = await pool.query(queryText, values);
    return res.rows[0];
  } catch (err) {
    console.error("Workout exercise creation failed:", err.message);

    // Throw err for api return
    throw err;
  }
};

/**
 * Creates an instance of a completed workout
 * @async
 * @param {number} user_id - User id
 * @param {number} workout_id - Completed workout id
 * @param {String} notes - Completed workout notes
 * @returns {Promise<Object>}
 * @throws {Error} If database fails to query
 */
const createCompletedWorkout = async (user_id, workout_id, notes) => {
  const queryText = `
  INSERT INTO workout_completed (user_id, workout_id, notes)
  VALUES ($1, $2, $3) 
  RETURNING *; 
  `;

  const values = [user_id, workout_id, notes];

  try {
    const res = await pool.query(queryText, values);
    return res.rows[0];
  } catch (err) {
    console.error("Completed workout creation failed:", err.message);

    // Throw err for api response
    throw err;
  }
};

/**
 * Creates note tracker for completed exercises.
 * * @async
 * @param {Object} exerciseNotes - contains completed exercise notes
 * @returns {Promise<Object>}
 * @throws {Error} If db fails to query
 */
const createCompletedExercise = async ({
  user_id,
  exercise_id,
  workout_completed_id,
  time_flag = false,
  notes = "",
}) => {
  const queryText = `
    INSERT INTO completed_exercises (user_id, exercise_id, workout_completed_id, time_flag, notes)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [user_id, exercise_id, workout_completed_id, time_flag, notes];

  try {
    const res = await pool.query(queryText, values);
    return res.rows[0];
  } catch (err) {
    console.error("Completed exercise creation failed:", err.message);

    // Throw err for api response
    throw err;
  }
};

/**
 * This function creates a finshed set instance.
 * * @async
 * @param {Object} exerciseInfo - Contains set weight, rep, rpe, and index info.
 * @returns {Promise<Object>}
 */
const createCompletedSet = async ({
  completed_exercise_id,
  weight,
  reps,
  rpe,
  set_number,
}) => {
  const queryText = `
    INSERT INTO completed_sets (completed_exercise_id, weight, reps, rpe, set_number)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [completed_exercise_id, weight, reps, rpe, set_number];

  try {
    const res = await pool.query(queryText, values);
    return res.rows[0];
  } catch (err) {
    console.error("Completed set creation failed:", err.message);

    // Throw err for api reponse
    throw err;
  }
};

// NOTE: user_exercise_stats is not accounted for here. I think it should be calculated upon workout completion.
// NOTE: Or maybe calculated upon user input of an exercise?? That paves the way to lot's of mistakes though... hmm

module.exports = {
  createUser,
  createProgram,
  createWorkout,
  createWorkoutExercises,
  createCompletedWorkout,
  createCompletedExercise,
  createCompletedSet,
  addProgramWorkout,
};
