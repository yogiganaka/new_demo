const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // e.g., { id, role }
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
