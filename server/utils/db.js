/**
 *
 * @File db.js
 * @Description Makes and exports connection to PostgreSQL DB
 *
 */

require("dotenv").config();

const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.HOST,
  port: 5432,
  database: process.env.DB_NAME,
  ssl: process.env.NODE_ENV === "production" ? false : true,
});

module.exports = pool;
