const { Router } = require("express");
const root = Router();
// Import routing files here
const userRouter = require("./userRouter.js");

root.use("/user", userRouter);

module.exports = root;
