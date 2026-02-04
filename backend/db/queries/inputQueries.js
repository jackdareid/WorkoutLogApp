// db/queries/inputQueries.js
const pool = require("./poolConnection.js");

const hash = (p) => {
  return p;
};

const createUser = async (first_name, last_name, email, password) => {
  /*
   * This function creates a new user and returns the user's user_id once created.
   * It requires user's first and last name, email, and a password.
   */

  // Query info
  const queryText = `
    INSERT INTO users (f_name, l_name, email, password_hash)
    VALUES
    ($1, $2, $3, $4)
    RETURNING *;
  `;

  const hashed_password = hash(password);
  const values = [first_name, last_name, email, hashed_password];

  try {
    const res = await pool.query(queryText, values);

    // Return user data
    return res.rows[0];
  } catch (err) {
    // 23505 is a Unique Violation error
    if (err.code === "23505") {
      console.error("User creation failed: email already exists");

      // Throw so that API sends error response back to user.
      throw err;
    }
  }
};

const createProgram = async (user_id, program_name, program_notes) => {
  /*
   * This function creates a new program. Workouts are linked to a program.
   *
   * Currently writing this under the assumption that we will have access to user_id
   * from the frontend. If not, create query to find user_id using email.
   */

  // Step 1: Create SQL Query
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
    console.error("Program creation failed.");

    // Throw for API response
    throw err;
  }
};

const createWorkout = async (
  user_id,
  program_id,
  workout_name,
  workout_notes,
) => {
  /*
   * This function creates a new workout
   *
   * Currently acting under the assumption that we will have access to user_id and program_id
   */

  // Step 1: Create SQL Query
  const queryText = `
    INSERT INTO workouts (user_id, program_id, name, notes)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;

  const values = [user_id, program_id, workout_name, workout_notes];

  try {
    const res = await pool.query(queryText, values);
    return res.rows[0];
  } catch (err) {
    console.error("Workout creation failed");

    // Throw err for API response
    throw err;
  }
};

const createWorkoutExercises = async (
  exercise_id,
  workout_id,
  order_index,
  sets,
  reps,
  rest,
  time_f,
  distance,
  notes,
) => {
  /*
   * This function links an exercise to a workout
   * Need workout id and exercise id
   */

  const queryText = `
    INSERT INTO workout_exercises (workout_id, exercise_id, order_index, target_sets, target_reps, rest, time_flag, distance, notes)
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
    console.error("Workout exercise creation failed.");

    // Throw err for api return
    throw err;
  }
};

const createCompletedWorkout = async (user_id, workout_id, notes) => {
  /*
   * This function creates an instance of a completed workout
   * Need user id and workout id
   * Not sure how to implement end time here... maybe an end workout button?
   */

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
    console.error("Completed workout creation failed.");

    // Throw err for api response
    throw err;
  }
};

const createCompletedExercise = async (
  user_id,
  exercise_id,
  workout_completed_id,
  time_flag,
  notes,
) => {
  /*
   * This function is used to track notes for completed exercises. The actual
   * exercise reps and weights will be tracked under completed_sets.
   * Need user id, exercise id, workout id.
   */

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
    console.error("Completed exercise creation failed");

    // Throw err for api response
    throw err;
  }
};

const createCompletedSet = async (
  completed_exercise_id,
  weight,
  reps,
  rpe,
  set_number,
) => {
  /*
   * This function is used to create a finished set instance.
   * Needs completed exercise id
   */

  const queryText = `
    INSERT INTO completed_sets (completed_exercise_id, weight, reps, rpe, set_number)
    VALUES ($1, $2, $3, $4, $5)
  `;

  const values = [completed_exercise_id, weight, reps, rpe, set_number];

  try {
    const res = await pool.query(queryText, values);
    return res.rows[0];
  } catch (err) {
    console.error("Completed set creation failed.");

    // Throw err for api reponse
    throw err;
  }
};

// createUser("Jackson", "Reid", "juckjack@jack.jack", "packjacksackrack");

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
};
