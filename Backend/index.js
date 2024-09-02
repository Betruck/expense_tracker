const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const expenseRoutes = require('./routes/expense');
const signUpRoutes = require('./routes/signup'); // Correctly import signup route
const cors = require('cors');
require('dotenv').config();

const app = express();

// Use CORS and JSON middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  credentials: true // Enable cookies and authorization headers
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);  // Authentication routes (login)
app.use('/api/signup', signUpRoutes);  // Signup route
app.use('/api/expenses', expenseRoutes);  // Expense routes

// Sync models with database and start the server
sequelize.sync().then(() => {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}).catch(err => {
  console.error('Failed to sync database:', err);
});
