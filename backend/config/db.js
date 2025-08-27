const {Pool} = require('pg');
require('dotenv').config({ path: __dirname + '/../.env' });

console.log("Loaded ENV:", {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});



pool.connect()
  .then(() => console.log('Connected to the database'))
  .catch(err => console.error('Database connection error:', err));

module.exports = pool;
