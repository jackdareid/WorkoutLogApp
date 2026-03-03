const bcrypt = require("bcrypt");
const {
  getLoginInfo,
  checkEmail,
} = require("../db/queries/retrievalQueries.js");
const { createUser } = require("../db/queries/inputQueries.js");

const loginUser = async (req, res) => {
  /*
   * This function logs a user in and returns all of their info minus their password.
   *
   * Accepts: req and res
   *
   * Returns: json user data
   */
  const { email, password } = req.body;

  try {
    const user = await getLoginInfo(email);

    // User not found
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check password
    const verify = await bcrypt.compare(password, user.password_hash);

    if (verify) {
      // Success!
      // Destructure to remove password_hash data
      const { password_hash, ...user_data } = user;
      return res.json({ message: "Login successful", data: user_data });
    }

    // Password failed
    return res.status(401).json({ message: "Invalid email or password" });
  } catch (err) {
    console.error("Error authenticating user");

    return res.status(500).json({ error: "Internal server error" });
  }
};

const signupUser = async (req, res) => {
  /*
   * This function signs a user up with the f_name, l_name, email, and password.
   *
   * Accepts: req and res
   *
   * Returns: user instance
   */
  const { f_name, l_name, email, password } = req.body;

  try {
    // Internal check on whether email is in use or not.
    const obj = await createUser(f_name, l_name, email, password);
    return res
      .status(201)
      .json({ message: "Succesfully created user!", data: obj });
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).json({ error: "Email already in use" });
    }
    console.error("Error creating user");

    return res.status(500).json({ error: "Internal server error" });
  }
};

// const mockReq = {
//   body: {
//     email: "testy@gmail.com",
//     password: "fake_password!",
//   },
// };
//
// const mockRes = {
//   // We mock the status and json methods so the code doesn't crash
//   status: function (code) {
//     console.log("Status:", code);
//     return this;
//   },
//   json: function (data) {
//     console.log("Response JSON:", data);
//     return this;
//   },
//   send: function (msg) {
//     console.log("Response Msg:", msg);
//     return this;
//   },
// };
//
// const res = loginUser(mockReq, mockRes);
// console.log(res);

module.exports = {
  loginUser,
  signupUser,
};
