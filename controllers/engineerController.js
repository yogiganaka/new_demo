const { getAllEngineers } = require('../models/engineerModel');

exports.fetchAllEngineers = async (req, res) => {
  try {
    const engineers = await getAllEngineers();
    res.json(engineers);
  } catch (err) {
    console.error('Error fetching engineers:', err);
    res.status(500).json({ message: 'Failed to fetch engineers' });
  }
};

const { getEngineerCapacity } = require('../models/engineerModel');

exports.getEngineerCapacityById = async (req, res) => {
  try {
    const engineerId = req.params.id;
    const data = await getEngineerCapacity(engineerId);

    if (!data) return res.status(404).json({ message: 'Engineer not found' });

    res.json({
      max_capacity: data.max_capacity,
      allocated: data.allocated,
      available: data.available
    });
  } catch (err) {
    console.error('Error fetching capacity:', err);
    res.status(500).json({ message: 'Failed to fetch engineer capacity' });
  }
};

