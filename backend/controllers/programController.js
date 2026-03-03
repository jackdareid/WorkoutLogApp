//controllers/programController.js
const { createProgram } = require("../db/queries/inputQueries.js");

const makeProgram = async (req, res) => {
  /* This function creates a program.
   *
   * Tested: false
   *
   * Accepts: req and res
   *
   * Returns: Program instance
   */
  const { user_id, program_name, program_notes } = req.body;
};
