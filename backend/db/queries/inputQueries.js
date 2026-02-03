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
    RETURNING user_id, f_name, email, date_joined`;

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
    }

    // Throw so that API sends error response back to user.
    throw err;
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
    RETURNING program_id, user_id, name, date_created, notes
  `;

  const values = [user_id, program_name, program_notes];

  try {
    const res = await pool.query(queryText, values);

    // Return program data
    return res.rows[0];
  } catch (err) {
    console.error("Program creation failed.");
  }

  // Throw for API response
  throw err;
};

const createWorkout = async (workout_name, workout_notes) => {
  /*
   * This function creates a new workout
   * Need to get user id and program id if applicable
   */
};

const createWorkoutExercises = async (
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
};

const createCompletedWorkout = async (start_time, end_time, notes) => {
  /*
   * This function creates an instance of a completed workout
   * Need user id and workout id
   */
};

const createCompletedExercise = async (time_flag, notes) => {
  /*
   * This function is used to track notes for completed exercises. The actual
   * exercise reps and weights will be tracked under completed_sets.
   * Need user id, exercise id, workout id.
   */
};

const createCompletedSet = async (weight, reps, rpe, set_number) => {
  /*
   * This function is used to create a finished set instance.
   * Needs completed exercise id
   */
};

// createUser("Jackson", "Reid", "juckjack@jack.jack", "packjacksackrack");

module.exports = {
  createUser,
  createProgram,
  createWorkout,
  createWorkoutExercises,
  createCompletedWorkout,
  createCompletedExercise,
  createCompletedSet,
};
