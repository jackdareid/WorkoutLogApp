// retrievalQueries.js

const pool = require("../poolConnection.js");

// 1. Retrieve user data
const getUserData = async (email) => {
  /*
   * This function retrieves user data, using their email to query the database.
   *
   * Tested: True
   *
   * Accepts: User's email
   * Returns: user's information, minus their hashed password.
   */
  const queryText = `SELECT user_id, f_name, l_name, date_joined FROM users WHERE email = $1;`;

  try {
    const res = await pool.query(queryText, [email]);
    return res.rows[0];
  } catch (err) {
    console.error("Unable to retrieve user data.");

    // Throw err for api response
    throw err;
  }
};

const getUserById = async (user_id) => {
  const sql = `
    SELECT user_id, f_name, l_name, email, password_hash
    FROM users
    WHERE user_id = $1;
  `;

  const result = await pool.query(sql, [user_id]);
  return result.rows[0];
};

// 1.1. Check if email is in DB
const checkEmail = async (email) => {
  /*
   * This function checks to see if an email is already being used in the database.
   *
   * Tested: True
   *
   * Accepts: User's email
   * Returns: pg.result object. Use .rowCount to see whether a row is found (= 1) or not (= 0)
   */
  const queryText = `SELECT 1 FROM users WHERE email = $1;`;

  try {
    const res = await pool.query(queryText, [email]);
    return res;
  } catch (err) {
    console.error("Error accessing database.");
    // Throw err for api response
    throw err;
  }
};

const programExistsForUser = async (program_id, user_id) => {
  const sql = `
    SELECT 1 FROM programs
    WHERE program_id = $1 
      AND user_id = $2;
  `;

  const res = await pool.query(sql, [program_id, user_id]);
  return res.rows.length === 1;
};

const workoutExistsForProgram = async (workout_id, program_id) => {
  const sql = `
    SELECT 1 FROM program_workouts
    WHERE workout_id = $1
      AND program_id = $2;
  `;

  const res = await pool.query(sql, [workout_id, program_id]);
  return res.rowCount === 1;
};

// 2. Get user programs
const getPrograms = async (user_id) => {
  /*
   * This function retrieves a users programs using their user_id.
   *
   * Tested: True
   *
   * Accepts: user_id
   * Returns: List of program objects
   */
  const queryText = `SELECT * FROM programs WHERE user_id = $1;`;

  try {
    const res = await pool.query(queryText, [user_id]);
    return res.rows;
  } catch (err) {
    console.error(`Error retrieving user programs.`);
    throw err;
  }
};

// 3. Get user workouts
const getUserWorkouts = async (user_id) => {
  /*
   * This function retrieves a users workouts using their user_id.
   *
   * Tested: True
   *
   * Accepts: user_id
   * Returns: List of workout objects
   */

  const queryText = `SELECT * FROM workouts WHERE user_id = $1;`;

  try {
    const res = await pool.query(queryText, [user_id]);
    return res.rows;
  } catch (err) {
    console.error("Error retrieving users workouts.");
    throw err;
  }
};

// 4. Get program workouts
const getProgramWorkouts = async (program_id) => {
  /*
   * This function returns all workouts associated with a program.
   *
   * Tested: True
   *
   * Accepts: program_id.
   * Returns: List of workouts.
   */

  const queryText = `
    SELECT w.* FROM workouts w
    JOIN program_workouts pw ON w.workout_id = pw.workout_id
    WHERE pw.program_id = $1;
  `;

  try {
    const res = await pool.query(queryText, [program_id]);
    return res.rows;
  } catch (err) {
    throw err;
  }
};

/**
 * @async
 * This function retrieves all exercises associated with a workout and their sets / reps in
 * this specific workout..
 * @param {number} workout_id - The workout's unique id
 * @return {Promise<Object>}
 */
const getWorkoutExercises = async (workout_id) => {
  // Eventually load exercises with getProgramWorkouts above ^^
  const sql = `
    SELECT we.*, e.name 
    FROM workout_exercises we
    LEFT JOIN exercises e ON we.exercise_id = e.exercise_id
    WHERE we.workout_id = $1
    ORDER BY we.order_index ASC;
  `;
  try {
    const response = await pool.query(sql, [workout_id]);
    return response.rows;
  } catch (err) {
    console.error("Error retrieving workout exercises:", err.message);
    throw err;
  }
};

// 5. Get stats from previous iteration of current workout
const getPreviousWorkout = async (workout_id) => {
  /*
   * This function finds all exercises associated with the provided workout and returns the users
   * stats in order to help them remember what they should be lifting this time.
   *
   * Tested: True
   *
   * Accepts: workout_id
   * Returns List of weight values: one for each exercise.
   */
  // (workout_id) --> workout_exercises (for order_index of each exercise)
  // Get list of exercises

  const completed_workout_query = `
    SELECT * FROM workout_completed 
    WHERE workout_id = $1;
  `;
  let completed_workouts;
  try {
    completed_workouts = await pool.query(completed_workout_query, [
      workout_id,
    ]);
  } catch (err) {
    console.error("FAIL!");
    throw err;
  }

  // JOIN on completed sets to get the specifics of each completed exercise
  // const join_query = `SELECT * FROM completed_exercises OUTER JOIN completed_sets ON completed_exercises.completed_exercise_id=completed_sets.completed_exercise_id;`;
  const join_query_2 = `SELECT 
    ce.completed_exercise_id, ce.exercise_id, ce.workout_completed_id, ce.notes,
    cs.* 
    FROM completed_exercises ce
    LEFT JOIN completed_sets cs 
    ON ce.completed_exercise_id = cs.completed_exercise_id
    WHERE ce.workout_completed_id = $1
    ORDER BY 
      ce.completed_exercise_id ASC,
      cs.set_number;`;
  try {
    const result = await pool.query(join_query_2, [
      completed_workouts.rows[0].workout_completed_id,
    ]);
    return result.rows;
  } catch (err) {
    console.error("Failed to join");
    throw err;
  }
};

// 6.  all exercises
const getExercises = async () => {
  /*
   * This function retrieves list of exercises from the db
   *
   * Tested: True
   *
   * Accepts: None
   * Returns: Rows of exercises
   */
  const queryText = `
    SELECT * FROM exercises;
  `;
  try {
    const res = await pool.query(queryText);
    return res.rows;
  } catch (err) {
    console.error("Error retrieving exercises.");
    throw err;
  }
};

const getExerciseById = async (id) => {
  const sql = `
    SELECT * FROM exercises 
    WHERE exercise_id = $1
  `;

  try {
    const res = await pool.query(sql, [id]);
    return res.rows[0];
  } catch (err) {
    console.error(
      "Fatal Database Error retrieving exercise by id: ",
      err.message,
    );
    throw err;
  }
};

const getExerciseByName = async (name, client) => {
  const sql = `
    SELECT * FROM exercises 
    WHERE name = $1
  `;

  try {
    if (client) {
      const res = await client.query(sql, [name]);
      return res.rows[0];
    }
    const res = await pool.query(sql, [name]);
    // If found, exercise is returned. If not, undefined is returned.
    return res.rows[0];
  } catch (err) {
    console.error(
      "Fatal Database Error retrieving exercise by name:",
      err.message,
    );
    throw err;
  }
};

// 7. Retrieve user info for login
const getLoginInfo = async (email) => {
  /*
   * This function returns the user's email and password for authentication purposes.
   *
   * Tested: False
   *
   * Accepts: email
   * Returns: email, hashed_password
   */
  const queryText = `
    SELECT * FROM users
    WHERE email = $1;
  `;

  try {
    const res = await pool.query(queryText, [email]);
    return res.rows[0];
  } catch (err) {
    console.error("Error retrieving user login info.");
    throw err;
  }
};

module.exports = {
  getUserData,
  getUserById,
  programExistsForUser,
  workoutExistsForProgram,
  checkEmail,
  getPrograms,
  getUserWorkouts,
  getProgramWorkouts,
  getWorkoutExercises,
  getPreviousWorkout,
  getExercises,
  getExerciseById,
  getExerciseByName,
  getLoginInfo,
};
