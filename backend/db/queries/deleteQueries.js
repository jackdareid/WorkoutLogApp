// queries/deleteQueries.js
const pool = require("../poolConnection.js");

const removeProgramWorkout = async (program_id, workout_id) => {
  /*
   * This function removes a workout from a program.
   *
   * Tested: false
   */
  const queryText = `
    DELETE FROM program_workouts 
    WHERE program_id = $1 AND workout_id = $2
    RETURNING *;
  `;

  try {
    const res = await pool.query(queryText, [program_id, workout_id]);
    return res.rowCount > 0;
  } catch (err) {
    console.error("Failed to delete workout from program");
    throw err;
  }
};

/**
 * @async
 * This function deletes a user's program
 * @param {number} user_id - id of user whose program is being deleted
 * @param {number} program_id - id of program that is being deleted
 * @return {bool} true if deleted, false on failure
 */
const deleteProgram = async (user_id, program_id) => {
  const sql = `
    DELETE FROM programs
    WHERE user_id = $1 AND program_id = $2
    RETURNING *;
  `;

  try {
    const res = await pool.query(sql, [user_id, program_id]);
    return res.rowCount > 0;
  } catch (err) {
    console.error("Failed to delete program:", err.message);
    throw err;
  }
};

module.exports = {
  removeProgramWorkout,
  deleteProgram,
};
