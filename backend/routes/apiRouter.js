import Router from "express";
const root = Router();

// Import routing files here
const userRouter = require("./userRouter.js");
const programRouter = require("./programRouter.js");
const workoutRouter = require("./workoutRouter.js");

// Routes
root.use("/user", userRouter);
root.use("/program", programRouter);
root.use("/workout", workoutRouter);

module.exports = root;
