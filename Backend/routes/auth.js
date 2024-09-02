const express = require('express');
const { login } = require('../controllers/authController'); // Keep only login function
const router = express.Router();

// Login route using a controller function
router.post('/login', login);

module.exports = router;
