// db/queries/inputQueries.js

require("dotenv").config();
const { Pool } = require("pg");

console.log(
  `Connecting to: ${process.env.DB_DATABASE} on host: ${process.env.DB_HOST}`,
);

const role_name = process.env.DB_USERNAME;
const role_password = process.env.DB_PASSWORD;
const host_name = process.env.DB_HOST;
const port = process.env.DB_PORT;
const db_name = process.env.DB_DATABASE;

testPoolConnection = async () => {
  const pool = new Pool({
    user: role_name,
    host: host_name,
    database: db_name,
    password: "Tellur@2",
    port: port,
  });

  try {
    await pool.query("SELECT current_database();");
    console.log("Connected to database!");
  } catch (err) {
    console.log(`Pool connection error: ${err}`);
  } finally {
    await pool.end();
  }
};

const hash = (p) => {
  return p;
};

// const createUser = (first_name, last_name, email, password) => {
//   const hashed_password = hash(password);
//   const queryText = `
//     INSERT INTO users (f_name, l_name, email, password_hash)
//     VALUES
//     ($1, $2, $3, $4)`;
//   const values = [first_name, last_name, email, hashed_password];
//
// try {
//   const res = await pool.query(queryText, values);
// } catch (err) {
//   console.log(`Error occurred: ${err}`);
// } finally {
//   await pool.close();
// }
// };

testPoolConnection();
