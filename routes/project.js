const express = require('express');
const router = express.Router();
const { fetchAllProjects ,createProject ,fetchProjectById} = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, fetchAllProjects);
router.post('/', authMiddleware, createProject); 
router.get('/:id', authMiddleware, fetchProjectById);

module.exports = router;
