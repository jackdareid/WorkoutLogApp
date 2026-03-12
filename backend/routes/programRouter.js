//routes/programRouter.js
const { Router } = require("express");
const {
  makeProgram,
  addWorkout,
  removeWorkout,
} = require("../controllers/programController.js");

const programRouter = Router();

programRouter.post("/create", makeProgram);

programRouter.post("/:id/workouts", addWorkout);

programRouter.delete("/:id/workouts/:workout_id", removeWorkout);

module.exports = programRouter;
