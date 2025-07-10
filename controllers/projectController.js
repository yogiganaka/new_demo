const { getAllProjects , createProject, getProjectById  } = require('../models/projectModels');

exports.fetchAllProjects = async (req, res) => {
  try {
    const projects = await getAllProjects();
    res.json(projects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    res.status(500).json({ message: 'Failed to fetch projects' });
  }
};

exports.createProject = async (req, res) => {
  try {
    const {
      name,
      description,
      start_date,
      end_date,
      required_skills,
      team_size,
      status
    } = req.body;

    const manager_id = req.user.id;

    const project = await createProject({
      name,
      description,
      start_date,
      end_date,
      required_skills,
      team_size,
      status,
      manager_id
    });

    res.status(201).json(project);
  } catch (err) {
    console.error('Error creating project:', err);
    res.status(500).json({ message: 'Failed to create project' });
  }
};

exports.fetchProjectById = async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await getProjectById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (err) {
    console.error('Error fetching project:', err);
    res.status(500).json({ message: 'Failed to fetch project' });
  }
};