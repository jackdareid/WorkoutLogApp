// routes/userRouter.js
const { Router } = require("express");

const router = Router();
const {
  loginUser,
  signupUser,
  getMe,
} = require("../controllers/userController.js");
const { protect } = require("../middleware/authMiddleware.js");

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.get("/me", protect, getMe);

module.exports = router;
