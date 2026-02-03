// db/queries/inputQueries.js
const pool = require("./poolConnection.js");

const hash = (p) => {
  return p;
};

// This function creates a new user
const createUser = async (first_name, last_name, email, password) => {
  // Query info
  const queryText = `
    INSERT INTO users (f_name, l_name, email, password_hash)
    VALUES
    ($1, $2, $3, $4)`;

  // Hash password and get values array
  const hashed_password = hash(password);
  const values = [first_name, last_name, email, hashed_password];

  try {
    const res = await pool.query(queryText, values);
    console.log(`Result: ${res.rows}`);
  } catch (err) {
    console.log(`Error occurred: ${err}`);
  } finally {
    await pool.end();
  }
};

const createProgram = async (program_name, program_notes) => {
  /*
   * This function creates a new program. Workouts are linked to a program.
   * Need to get user id for this
   */
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
