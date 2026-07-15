// routes/userRouter.js
const { Router } = require("express");
const { validateRequest } = require("../middleware/validateRequest")
const { signupSchema } = require("../validation/userSchemas")

const userRouter = Router();
const {
  loginUser,
  signupUser,
  getMe,
} = require("../controllers/userController.js");
const { protect } = require("../middleware/authMiddleware.js");

userRouter.post("/login", loginUser);
userRouter.post("/signup", validateRequest(signupSchema), signupUser);
userRouter.get("/me", protect, getMe);

module.exports = userRouter;
