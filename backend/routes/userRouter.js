// routes/userRouter.js
const { Router } = require("express");

const userRouter = Router();
const {
  loginUser,
  signupUser,
  getMe,
} = require("../controllers/userController.js");
const { protect } = require("../middleware/authMiddleware.js");

userRouter.post("/login", loginUser);
userRouter.post("/signup", signupUser);
userRouter.get("/me", protect, getMe);

module.exports = userRouter;
