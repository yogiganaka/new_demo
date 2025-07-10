const pool = require('../db');

// Get all assignments with engineer & project details
const getAllAssignments = async () => {
  const result = await pool.query(`
    SELECT 
      a.id,
      a.engineer_id,
      u.name AS engineer_name,
      a.project_id,
      p.name AS project_name,
      a.allocation_percentage,
      a.role,
      a.start_date,
      a.end_date
    FROM assignments a
    JOIN users u ON a.engineer_id = u.id
    JOIN projects p ON a.project_id = p.id
  `);
  return result.rows;
};

//create assignment
const createAssignment = async ({
  engineer_id,
  project_id,
  allocation_percentage,
  role,
  start_date,
  end_date
}) => {
  const result = await pool.query(
    `INSERT INTO assignments 
    (engineer_id, project_id, allocation_percentage, role, start_date, end_date)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *`,
    [engineer_id, project_id, allocation_percentage, role, start_date, end_date]
  );

  return result.rows[0];
};

//update assignment
const updateAssignment = async (id, fieldsToUpdate) => {
  const keys = Object.keys(fieldsToUpdate);
  if (keys.length === 0) return null;

  const setClause = keys.map((key, idx) => `${key} = $${idx + 1}`).join(', ');
  const values = Object.values(fieldsToUpdate);

  const result = await pool.query(
    `UPDATE assignments SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`,
    [...values, id]
  );

  return result.rows[0];
};

const deleteAssignment = async (id) => {
  const result = await pool.query('DELETE FROM assignments WHERE id = $1 RETURNING *', [id]);
  return result.rows[0]; // returns the deleted row (or undefined if not found)
}; 
module.exports = { getAllAssignments,createAssignment,updateAssignment,deleteAssignment };
