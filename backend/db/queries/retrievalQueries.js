// retrievalQueries.js

const pool = require("./poolConnection.js");

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
    console.log(`Result: ${res}`);
    return res;
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
    return res;
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

  const queryText = `SELECT * FROM workouts WHERE program_id = $1;`;

  try {
    const res = await pool.query(queryText, [program_id]);
    return res;
  } catch (err) {
    console.error("Error retrieving program workouts.");
    throw err;
  }
};

// 5. Get stats from previous iteration of current workout
const getPreviousWorkout = async (workout_id) => {
  /*
   * This function finds all exercises associated with the provided workout and returns the users
   * stats in order to help them remember what they should be lifting this time.
   *
   * Tested: False
   *
   * Accepts: workout_id
   * Returns List of weight values: one for each exercise.
   */
  // (workout_id) --> workout_exercises (for order_index of each exercise)
  // Get list of exercises

  const completed_workout_query = `SELECT * FROM workout_completed WHERE workout_id = $1;`;
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
  let workout_details;
  try {
    workout_details = await pool.query(join_query_2, [
      completed_workouts.rows[0].workout_completed_id,
    ]);
  } catch (err) {
    console.error("Failed to join");
    throw err;
  }

  return workout_details;
};

// 6.  all exercises

// 7. Update exercise stats upon workout completion (differnt file)

// 8. Authenticate email & password

// (async () => {
//   const value1 = await checkEmail("testy@gmail.com");
//   console.log(`Good email: ${value1.rowCount}`);
//   const value2 = await checkEmail("testfail@gmail.com");
//   console.log(`Fail email: ${value2.rowCount}`);
// })();

// (async () => {
//   const res = await getProgramWorkouts(1);
//   console.log(res.rows[0]);
// })();

(async () => {
  await getPreviousWorkout((workout_id = 3));
})();
