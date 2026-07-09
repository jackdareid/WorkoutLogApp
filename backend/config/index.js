const path = require("path");

const env = process.env.NODE_ENV || "development";

// Load env variables depending on runtime environment
if (env === "test") {
  require("dotenv").config({ path: path.join(__dirname, "../.env.test") });
} else if (env === "development") {
  require("dotenv").config({ path: path.join(__dirname, "../.env") });
} else if (env === "production") {
  // No env loading in production
} else {
  throw new Error(`Invalid NODE_ENV: ${env}`);
}

// Validate required configuration
const requiredEnvVars = [
  "DB_HOST",
  "DB_DATABASE",
  "DB_USERNAME",
  "DB_PASSWORD",
  "JWT_SECRET",
];

const missingVars = [];

for (const v of requiredEnvVars) {
  if (!process.env[v]) {
    missingVars.push(v);
  }
}

if (missingVars.length !== 0) {
  let errMessage = "Error: Missing required environment variables";

  for (const e of missingVars) {
    errMessage += `\n - ${e}`;
  }
  throw new Error(errMessage);
}

// Create config object
const config = {
  env,
  server: {
    port: Number(process.env.PORT) || 3000,
  },
  database: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    name: process.env.DB_DATABASE,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "24h",
  },
  client: {
    url: process.env.CLIENT_URL || "http://localhost:5173",
  },
};

module.exports = Object.freeze(config);
