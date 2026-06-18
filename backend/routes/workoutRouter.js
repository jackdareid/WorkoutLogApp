//routes/workoutRouter.js
const { Router } = require("express");
const { protect } = require("../middleware/authMiddleware.js");
const compileWorkout = require("../controllers/workoutController.js");

const workoutRouter = Router();

workoutRouter.use(protect);

workoutRouter.post("/create", compileWorkout);

module.exports = workoutRouter;
