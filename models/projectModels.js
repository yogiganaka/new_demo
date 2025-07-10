const pool = require('../db');

// Fetch all projects
const getAllProjects = async () => {
    const result = await pool.query(`
    SELECT id, name, description, start_date, end_date, required_skills, team_size, status
    FROM projects
  `);
    return result.rows;
};


//create new project
const createProject = async ({
    name,
    description,
    start_date,
    end_date,
    required_skills,
    team_size,
    status,
    manager_id
}) => {
    const result = await pool.query(
        `INSERT INTO projects 
    (name, description, start_date, end_date, required_skills, team_size, status, manager_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *`,
        [name, description, start_date, end_date, required_skills, team_size, status, manager_id]
    );

    return result.rows[0];
};

// Get single project by ID
const getProjectById = async (id) => {
  const result = await pool.query(
    `SELECT id, name, description, start_date, end_date, required_skills, team_size, status, manager_id
     FROM projects WHERE id = $1`,
    [id]
  );
  return result.rows[0];
};

module.exports = { getAllProjects , createProject, getProjectById};
