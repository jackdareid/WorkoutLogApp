// retrievalQueries.js

const pool = require("./poolConnection.js");

const getUserData = async (email) => {
  /*
   * This function retrieves user data, using their email to query the database.
   *
   * Tested: True
   *
   * Accepts: User's email
   * Returns: user's information, minus their hashed password.
   */
  const queryText = `SELECT user_id, f_name, l_name, date_joined FROM users WHERE email = $1;`;

  try {
    const res = await pool.query(queryText, [email]);
    return res.rows[0];
  } catch (err) {
    console.error("Unable to retrieve user data.");

    // Throw err for api response
    throw err;
  }
};

const checkEmail = async (email) => {
  /*
   * This function checks to see if an email is already being used in the database.
   *
   * Tested: True
   *
   * Accepts: User's email
   * Returns: pg.result object. Use .rowCount to see whether a row is found (= 1) or not (= 0)
   */
  const queryText = `SELECT 1 FROM users WHERE email = $1;`;

  try {
    const res = pool.query(queryText, [email]);
    return res;
  } catch (err) {
    console.error("Error accessing database.");
    // Throw err for api response
    throw err;
  }
};

// 1.1. Check if email already exists (for sign-up)

// 2. Get user programs

// 3. Get user workouts

// 4. Get program workouts

// 5. Get stats from previous iteration of current workout

// 6.  all exercises

// 7. Update exercise stats upon workout completion (differnt file)

// 8. Authenticate email & password

(async () => {
  const value1 = await checkEmail("testy@gmail.com");
  console.log(`Good email: ${value1.rowCount}`);
  const value2 = await checkEmail("testfail@gmail.com");
  console.log(`Fail email: ${value2.rowCount}`);
})();
