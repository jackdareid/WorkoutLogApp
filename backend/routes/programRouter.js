//routes/programRouter.js
const { Router } = require("express");
const { protect } = require("../middleware/authMiddleware.js");
const {
  removeWorkout,
  getWorkouts,
  getExercises,
  retrievePrograms,
  makeProgram,
} = require("../controllers/programController.js");

const programRouter = Router();

programRouter.get("/", protect, retrievePrograms);

programRouter.get("/:id/workouts", protect, getWorkouts);

programRouter.get("/:id/workouts/:workout_id", protect, getExercises);

programRouter.post("/create", protect, makeProgram);

// programRouter.post("/:id/workouts", protect, addWorkout);

programRouter.delete("/:id/workouts/:workout_id", protect, removeWorkout);

module.exports = programRouter;
