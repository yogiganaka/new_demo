const pool = require('../db');

// Find user by email
const findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
};

const findUserById = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

const getAllEngineers = async () => {
  const result = await pool.query(`
    SELECT id, email, name, role, skills, seniority, max_capacity, department, current_capacity
    FROM users
    WHERE role = 'engineer'
  `);
  return result.rows;
};

module.exports = { findUserByEmail , findUserById, getAllEngineers};

