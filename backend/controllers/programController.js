//controllers/programController.js
const {
  createProgram,
  addProgramWorkout,
} = require("../db/queries/inputQueries.js");
const {
  getPrograms,
  getProgramWorkouts,
  getWorkoutExercises,
} = require("../db/queries/retrievalQueries.js");
const {
  deleteProgram,
  removeProgramWorkout,
} = require("../db/queries/deleteQueries.js");
const compileWorkout = require("../controllers/workoutController.js");

const retrievePrograms = async (req, res) => {
  const user_id = req.user_id;

  try {
    const programs = await getPrograms(user_id);
    return res.status(200).json({ data: programs });
  } catch (err) {
    return res.status(500).json({ message: "Failure: Internal server error" });
  }
};

const makeProgram = async (req, res) => {
  // const client = await pool.connect()

  const user_id = req.user_id;
  console.log("User_id: ", user_id);
  const { name: programName, description: programDesc } = req.body;

  console.log("Program Name: ", programName);
  console.log("Program Description: ", programDesc);
  const workout_ids = await compileWorkout(user_id, req.body.workouts);
  console.log("Workout ids: ", workout_ids);

  try {
    const inst = await createProgram(user_id, programName, programDesc);
    for (id of workout_ids) await addWorkout(inst.program_id, id);
    return res
      .status(201)
      .json({ message: "Program creation successful", data: inst });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ message: "Name already in use" });
    }
    return res
      .status(500)
      .json({ message: `Internal server error: ${err.message}` });
  }
};

// NOTE: Edited with data type change. Removed user_id from query
const addWorkout = async (program_id, workout_id) => {
  try {
    await addProgramWorkout(program_id, workout_id);
  } catch (err) {
    console.error("Failure adding workouts to program: ", err.message);
    throw err;
  }
};

const removeProgram = async (req, res) => {
  const { id: program_id } = req.params;
  const user_id = req.user_id;

  console.log("ProgramID:", program_id, "UserID:", user_id);
  try {
    const success = await deleteProgram(user_id, program_id);
    if (!success) {
      return res
        .status(404)
        .json({ message: "Program not found / unauthorized" });
    }
    return res.status(200).json({ message: "Program deleted" });
  } catch (err) {
    console.error("Controller error:", err.message);
    res
      .status(500)
      .json({ message: "Internal server error: Could not delete" });
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
    console.error("Controller error:", err.message);
    res.status(500).json({ message: "Failure: Internal server error" });
  }
};

/**
 * @async
 * This function retrieves workouts relating to a certain program.
 */
const getWorkouts = async (req, res) => {
  const { id: program_id } = req.params;

  if (!program_id) {
    return res.status(400).json({ message: "Program ID is required" });
  }

  try {
    const workouts = await getProgramWorkouts(program_id);
    if (!workouts || workouts.length == 0) {
      return res
        .status(404)
        .json({ message: "No workouts found for this program" });
    }
    return res
      .status(200)
      .json({ message: "Workouts successfully retrieved", data: workouts });
  } catch (err) {
    console.error("Error in getWorkouts:", err.message);
    res.status(500).json({ message: "Failure: Internal server error" });
  }
};

/**
 * @async
 * This function retrieves exercises relating to a given workout id.
 */
const getExercises = async (req, res) => {
  const { workout_id } = req.params;

  if (!workout_id) {
    return res.status(400).json({ message: "Workout id required" });
  }

  try {
    const exercises = await getWorkoutExercises(workout_id);
    if (!exercises || exercises.length == 0) {
      return res
        .status(404)
        .json({ message: "No exercises found for this workout" });
    }
    return res
      .status(200)
      .json({ message: "Exercises successfully retrieved", data: exercises });
  } catch (err) {
    console.error("Error retrieving exercises:", err.message);
    res.status(500).json({ message: "Failure: Internal server error" });
  }
};

module.exports = {
  makeProgram,
  addWorkout,
  removeWorkout,
  removeProgram,
  getWorkouts,
  getExercises,
  retrievePrograms,
};
