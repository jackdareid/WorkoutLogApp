// routes/userRouter.js
const { Router } = require("express");

const userRouter = Router();
const { loginUser, signupUser } = require("../controllers/userController.js");

userRouter.post("/login", loginUser);

// userRouter.get("/signup", (req, res) => {
//   res.send({ title: "So this is the sign up page eh?" });
// });
//
// userRouter.post("/signup", (req, res) => {
//   signupUser(req, res);
// });

module.exports = userRouter;
