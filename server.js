const express = require('express');
require('dotenv').config();
const app = express();
const cors = require("cors");
// ✅ Enable CORS before defining routes
app.use(cors({
  origin: "http://localhost:3000", // frontend origin
  credentials: true               // only needed if you send cookies
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/engineers', require('./routes/engineer'));
app.use('/api/projects', require('./routes/project'));
app.use('/api/assignments', require('./routes/assignment'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

