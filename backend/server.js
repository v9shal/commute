const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const skillRoutes = require('./routes/skillRoutes');
const resourceRoutes =require('./routes/resourceRoute');
const profileRoute = require('./routes/profileRoute');
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173', // Frontend origin
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/auth', authRoutes);
app.use('/resource',resourceRoutes)
app.use('/skill', skillRoutes);
app.use('/profile',profileRoute)
// Simple test route
app.get('/hello', (req, res) => {
  res.json({ message: "Hello, world!" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));