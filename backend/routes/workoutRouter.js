//routes/workoutRouter.js
const { Router } = require("express");
const { protect } = require("../middleware/authMiddleware.js");
const { createWorkoutShell } = require("../controllers/workoutController.js");

const workoutRouter = Router();

workoutRouter.post("/create", protect, createWorkoutShell);

workoutRouter.post("/track", (req, res) => {
  // controller
});

module.exports = workoutRouter;
