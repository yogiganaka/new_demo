const pool = require('../db');

const getAllEngineers = async () => {
  const result = await pool.query(`
    SELECT id, email, name, role, skills, seniority, max_capacity, department,current_capacity
    FROM users
    WHERE role = 'engineer'
  `);
  return result.rows;
};

const getEngineerCapacity = async (engineerId) => {
  const userResult = await pool.query(
    'SELECT max_capacity FROM users WHERE id = $1 AND role = $2',
    [engineerId, 'engineer']
  );
  const user = userResult.rows[0];
  if (!user) return null;
  const now = new Date();
  const assignmentResult = await pool.query(
    `SELECT COALESCE(SUM(allocation_percentage), 0) AS total_allocation
     FROM assignments
     WHERE engineer_id = $1 AND start_date <= $2 AND end_date >= $2`,
    [engineerId, now]
  );
  const total_allocation = parseInt(assignmentResult.rows[0].total_allocation) || 0;
  return {
    max_capacity: user.max_capacity,
    allocated: total_allocation,
    available: user.max_capacity - total_allocation,
  };
};

module.exports = { getAllEngineers , getEngineerCapacity};
