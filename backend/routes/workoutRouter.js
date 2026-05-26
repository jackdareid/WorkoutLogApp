//routes/workoutRouter.js
const { Router } = require("express");
const { protect } = require("../middleware/authMiddleware.js");
const { createWorkoutShell } = require("../controllers/workoutController.js");

const router = Router();

router.use(protect);

router.post("/create", createWorkoutShell);

module.exports = router;
