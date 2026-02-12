const { Router } = require("express");
const userRouter = Router();

userRouter.post("/log-in", (req, res) => {
  // This is where a controller goes I believe
  console.log("Log in!");
});

userRouter.post("/sign-up", (req, res) => {
  // This is also where a controller goes I believe
  console.log("Sign up!");
});

userRouter.post("/log-out", (req, res) => {
  // This is also where a controller goes I believe
  console.log("Log out!");
});
