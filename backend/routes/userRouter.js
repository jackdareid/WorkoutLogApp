const { Router } = require("express");
const userRouter = Router();
const { loginUser, signupUser } = require("../controllers/userController.js");

userRouter.get("/log-in", (req, res) => {
  res.send({ title: "Hey there champ" });
});

userRouter.post("/log-in", (req, res) => {
  loginUser(req, res);
});

userRouter.get("/sign-up", (req, res) => {
  res.send({ title: "So this is the sign up page eh?" });
});

userRouter.post("/sign-up", (req, res) => {
  signupUser(req, res);
});

module.exports = userRouter;
