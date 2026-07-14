// db/queries/inputQueries.js
const pool = require("../poolConnection.js");

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
const createUser = async (first_name, last_name, email, hashed_password) => {
  const queryText = `
    INSERT INTO users (f_name, l_name, email, password_hash)
    VALUES
    ($1, $2, $3, $4)
    RETURNING user_id, f_name, l_name, date_joined, email;
  `;

  const values = [first_name, last_name, email, hashed_password];
  const res = await pool.query(queryText, values);

  return res.rows[0];
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
const createProgram = async (user_id, program_name, program_notes, client) => {
  const queryText = `
    INSERT INTO programs (user_id, name, notes)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const values = [user_id, program_name, program_notes];

  try {
    // If there's a separate client
    if (client) {
      const res = await client.query(queryText, values);
      return res.rows[0];
    }

    // If using general pool
    const res = await pool.query(queryText, values);
    return res.rows[0];
  } catch (err) {
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
 * NOTE: EDITED WITH DATATYPE CHANGES
 * * @async
 * @param {number} program_id - Unique id of the program
 * @param {number} workout_id - Unique id of the workout
 * @param {number} user_id - Unique id of the user
 * @returns {Promise<Object>} The newly created relationship record
 * @throws {Error} Throws a 23505 error if the link already exists.
 */
const addProgramWorkout = async (program_id, workout_id, client) => {
  const queryText = `
    INSERT INTO program_workouts (program_id, workout_id)
    VALUES ($1, $2)
    RETURNING *;
  `;

  const values = [program_id, workout_id];

  try {
    if (client) {
      const res = await client.query(queryText, values);
      return res.rows[0];
    }
    const res = await pool.query(queryText, values);
    return res.rows[0];
  } catch (err) {
    console.error("Link failed:", err.message);
    throw err;
  }
};

/**
 * Links an exercise to a user's workout.
 * NOTE: EDITED WITH DATATYPE CHANGES
 *
 * * @async
 * @param {Object} workoutExerciseData - Exercise Details object
 * @returns {Promise<Object>}
 */
const createWorkoutExercises = async (
  {
    exercise_id,
    workout_id,
    order_index,
    target_sets,
    target_reps,
    target_weight,
    target_duration,
    rest = 60,
    time_f = false,
    distance = 0,
    notes = "",
  },
  client,
) => {
  const queryText = `
    INSERT INTO workout_exercises (
      workout_id, 
      exercise_id, 
      order_index, 
      target_sets, 
      target_reps, 
      target_weight,
      target_duration,
      rest, 
      time_flag, 
      distance, 
      notes
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    RETURNING *;
  `;

  const values = [
    workout_id,
    exercise_id,
    order_index,
    target_sets,
    target_reps,
    target_weight,
    target_duration,
    rest,
    time_f,
    distance,
    notes,
  ];

  try {
    if (client) {
      const res = await client.query(queryText, values);
      return res.rows[0];
    }
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
 * This function creates a custom exercise for the user.
 *
 */
const createUserExercise = async (
  user_id,
  exercise_name,
  muscle_group = null,
  notes = null,
  client,
) => {
  const sql = `
    INSERT INTO exercises (user_id, name, muscle_group, notes)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [user_id, exercise_name, muscle_group, notes];
  console.log(`Values: ${values}`);

  try {
    if (client) {
      const res = await client.query(sql, values);
      return res.rows[0];
    }
    const res = await pool.query(sql, values);
    return res.rows[0];
  } catch (err) {
    console.error(`Exercise creation failure: ${err.message}`);
    throw err;
  }
};

/*
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
 * NOTE: EDITED WITH DATATYPE CHANGES
 * * @async
 * @param {Object} exerciseInfo - Contains set weight, rep, rpe, and index info.
 * @returns {Promise<Object>}
 */
const createCompletedSet = async ({
  completed_exercise_id,
  weight,
  reps,
  distance,
  duration,
  rpe,
  set_number,
}) => {
  const queryText = `
    INSERT INTO completed_sets (completed_exercise_id, weight, distance, duration, reps, rpe, set_number)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [
    completed_exercise_id,
    weight,
    reps,
    distance,
    duration,
    rpe,
    set_number,
  ];

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
  createUserExercise,
  createWorkoutExercises,
  createCompletedWorkout,
  createCompletedExercise,
  createCompletedSet,
  addProgramWorkout,
};
