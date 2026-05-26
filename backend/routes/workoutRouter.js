//routes/workoutRouter.js
const { Router } = require("express");
const { protect } = require("../middleware/authMiddleware.js");
const { createWorkoutShell } = require("../controllers/workoutController.js");

const workoutRouter = Router();

workoutRouter.use(protect);

workoutRouter.post("/create", createWorkoutShell);

module.exports = workoutRouter;
