//routes/programRouter.js
const { Router } = require("express");
const { protect } = require("../middleware/authMiddleware.js");
const {
  removeWorkout,
  getWorkouts,
  getExercises,
  retrievePrograms,
  makeProgram,
  removeProgram,
} = require("../controllers/programController.js");

const router = Router();
router.use(protect);

router.get("/", retrievePrograms);
router.post("/create", makeProgram);
router.delete("/:id", removeProgram);
router.get("/:id/workouts", getWorkouts);
router.get("/:id/workouts/:workout_id", getExercises);
// router.post("/:id/workouts", addWorkout);
router.delete("/:id/workouts/:workout_id", removeWorkout);

module.exports = router;
