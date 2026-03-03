const bcrypt = require("bcrypt");
const {
  getLoginInfo,
  getUserData,
} = require("../db/queries/retrievalQueries.js");

const loginUser = async (req, res) => {
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

const signupUser = async (req, res) => {};

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
