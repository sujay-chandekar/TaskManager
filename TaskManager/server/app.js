// Express app setup
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Import routes
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
app.use('/api', authRoutes);
app.use('/api/tasks', taskRoutes);

module.exports = app;
