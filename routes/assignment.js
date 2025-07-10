const express = require('express');
const router = express.Router();
const { fetchAllAssignments } = require('../controllers/assignmentController');
const { createAssignment } = require('../controllers/assignmentController')
const {updateAssignmentById}= require('../controllers/assignmentController')
const {deleteAssignmentById}= require('../controllers/assignmentController')
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, fetchAllAssignments);
router.post('/', authMiddleware, createAssignment); 
router.patch('/:id', authMiddleware, updateAssignmentById); 
router.delete('/:id', authMiddleware, deleteAssignmentById);

module.exports = router;
