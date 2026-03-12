// queries/updateQueries.js
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

module.exports = {
  removeProgramWorkout,
};
