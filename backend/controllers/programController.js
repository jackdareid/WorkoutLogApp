//controllers/programController.js
const {
  createProgram,
  addProgramWorkout,
} = require("../db/queries/inputQueries.js");
const { getPrograms } = require("../db/queries/retrievalQueries.js");
const { removeProgramWorkout } = require("../db/queries/updateQueries.js");

const retrievePrograms = async (req, res) => {
  const user_id = req.user;

  try {
    const programs = await getPrograms(user_id);
    return res.status(200).json({ data: programs });
  } catch (err) {
    return res.status(500).json({ message: "Failure: Internal server error" });
  }
};

const makeProgram = async (req, res) => {
  const user_id = req.user;
  const { program_name, program_notes } = req.body;

  try {
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
  const { id: program_id } = req.params;
  const { workout_id } = req.body;
  const user_id = req.user;

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
  const { id: program_id, workout_id } = req.params;

  try {
    await removeProgramWorkout(program_id, workout_id);
    return res.status(200).json({ message: "Workout deleted from program" });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "Workout already in program." });
    }

    res.status(500).json({ message: "Failure: Internal server error" });
  }
};

module.exports = {
  makeProgram,
  addWorkout,
  removeWorkout,
  retrievePrograms,
};
