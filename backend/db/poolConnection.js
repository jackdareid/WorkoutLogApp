const path = require("path");
const { Pool } = require("pg");
const pg = require("pg");

// 1700 is the Object identifier (OID) for PSQL's NUMERIC type
const NUMERIC_OID = 1700;

pg.types.setTypeParser(NUMERIC_OID, (value) => {
  // If db value is null, return null, otherwise convert to float
  return value === null ? null : parseFloat(value);
});

require("dotenv").config({
  // Auto connect to test db when using jest
  // path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
  path: path.resolve(__dirname, "../../.env.test"),
});
console.log(
  `Connecting to: ${process.env.DB_DATABASE} on host: ${process.env.DB_HOST}`,
);

const pool = new Pool({
  // Connect to pool
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

module.exports = pool;
