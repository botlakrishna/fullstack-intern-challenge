const pool = require('../config/db');
const bcrypt = require('bcryptjs');

const createUser = async({name, email, password, address, role}) => {
  const hashedPassword = await bcrypt.hash(password,10);
  const reesult = await pool.query(
    'INSERT INTO users(name, email, password, address, role) VALUES($1,$2,$3,$4,$5) RETURNING *', [name, email, hashedPassword, address, role]
  );
  return result.rows[0];

};

const getUserByEmail = async(email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};
module.exports = {createUser, getUserByEmail};
