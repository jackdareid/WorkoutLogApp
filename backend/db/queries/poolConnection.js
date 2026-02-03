const { Pool } = require("pg");
require("dotenv").config();
console.log(
  `Connecting to: ${process.env.DB_DATABASE} on host: ${process.env.DB_HOST}`,
);

const pool = new Pool({
  // Connect to pool
  user: process.env.DB_USERNAME,
  host: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USERNAME,
  port: process.env.DB_PORT || 5432,
});

module.exports = pool;
