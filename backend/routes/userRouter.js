const { Router } = require("express");
const userRouter = Router();
const { loginUser } = require("../controllers/userController.js");

userRouter.get("/log-in", (req, res) => {
  res.send({ title: "Hey there champ" });
});

userRouter.post("/log-in", (req, res) => {
  loginUser(req, res);
});

userRouter.post("/sign-up", (req, res) => {
  // This is also where a controller goes I believe
  console.log("Sign up!");
});

userRouter.post("/log-out", (req, res) => {
  // This is also where a controller goes I believe
  console.log("Log out!");
});

module.exports = userRouter;
