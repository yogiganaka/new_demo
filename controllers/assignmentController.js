const { getAllAssignments, createAssignment, updateAssignment, deleteAssignment } = require('../models/assignmentModel');

exports.fetchAllAssignments = async (req, res) => {
    try {
        const assignments = await getAllAssignments();
        res.json(assignments);
    } catch (err) {
        console.error('Error fetching assignments:', err);
        res.status(500).json({ message: 'Failed to fetch assignments' });
    }
};

exports.createAssignment = async (req, res) => {
    try {
        const {
            engineer_id,
            project_id,
            allocation_percentage,
            role,
            start_date,
            end_date
        } = req.body;

        const assignment = await createAssignment({
            engineer_id,
            project_id,
            allocation_percentage,
            role,
            start_date,
            end_date
        });

        res.status(201).json(assignment);
    } catch (err) {
        console.error('Error creating assignment:', err);
        res.status(500).json({ message: 'Failed to create assignment' });
    }
};


exports.updateAssignmentById = async (req, res) => {
    try {
        const assignmentId = req.params.id;
        const fieldsToUpdate = req.body;

        const updated = await updateAssignment(assignmentId, fieldsToUpdate);
        if (!updated) {
            return res.status(404).json({ message: 'Assignment not found or no fields updated' });
        }

        res.json(updated);
    } catch (err) {
        console.error('Error updating assignment:', err);
        res.status(500).json({ message: 'Failed to update assignment' });
    }
};

exports.deleteAssignmentById = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await deleteAssignment(id);

        if (!deleted) {
            return res.status(404).json({ message: 'Assignment not found' });
        }

        res.json({ message: 'Assignment deleted successfully', deleted });
    } catch (err) {
        console.error('Error deleting assignment:', err);
        res.status(500).json({ message: 'Failed to delete assignment' });
    }
};
