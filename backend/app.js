const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes'); // Add user routes
const assetRoutes = require('./routes/assetRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes); // Users route
app.use('/api/assets', assetRoutes);
app.use('/api/assignments', assignmentRoutes);

module.exports = app;
