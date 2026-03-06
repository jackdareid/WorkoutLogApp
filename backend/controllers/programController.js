//controllers/programController.js
import {
  createProgram,
  addProgramWorkout,
} from "../db/queries/inputQueries.js";

const { removeProgramWorkout } = require("../db/queries/updateQueries.js");

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

  try {
    // Check if program name connected to user already
    const inst = await createProgram(user_id, program_name, program_notes);
    return res
      .status(201)
      .json({ message: "Program creation successful", data: inst });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ message: "Name already in use" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};

const addWorkout = async (req, res) => {
  /*
   * This function adds a workout to a program
   *
   * Tested: false
   *
   * Returns: workout
   *
   * TODO: Need to change eventually to account for a workout being added to a program multiple times.
   * This needs to be ALLOWED... db change necessary. Not a priority though.
   */

  const { program_id, workout_id, user_id } = req.body;

  try {
    const inst = await addProgramWorkout(program_id, workout_id, user_id);
    return res
      .status(201)
      .json({ message: "Success: Workout added to program", data: inst });
  } catch (err) {
    return res.status(500).json({ message: "Failure: Internal server error" });
  }
};

const removeWorkout = async (req, res) => {
  /*
   * This function removes a workout from a program
   *
   * Tested: false
   *
   * Returns: boolean
   */
  const { program_id, workout_id } = req.body;

  try {
    await removeProgramWorkout(program_id, workout_id);
    return res.status(204).json({ message: "Workout deleted from program" });
  } catch (err) {
    return res.status(500).json({ message: "Failure: Internal server error" });
  }
};

module.exports = {
  makeProgram,
};
