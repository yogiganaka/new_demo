const express = require('express');
const router = express.Router();
const { fetchAllEngineers, getEngineerCapacityById } = require('../controllers/engineerController');
const authMiddleware = require('../middleware/authMiddleWare');

router.get('/', authMiddleware, fetchAllEngineers);

router.get('/:id/capacity', authMiddleware, getEngineerCapacityById);

module.exports = router;
