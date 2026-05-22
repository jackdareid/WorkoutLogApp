// controllers/workoutController.js
const {
  createWorkout,
  createWorkoutExercises,
} = require("../db/queries/inputQueries.js");

const createWorkoutShell = async (req, res) => {
  const user_id = req.user;
  const { name: workout_name, notes: workout_notes } = req.body;

  try {
    const inst = await createWorkout(user_id, workout_name, workout_notes);
    return res
      .status(201)
      .json({ message: "Workout creation successful", data: inst });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createWorkoutShell,
};
