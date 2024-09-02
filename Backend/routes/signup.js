// routes/signup.js
const express = require('express');
const bcrypt = require('bcrypt');
const { pool } = require('../db'); // Ensure pool is correctly configured to connect to your database
const router = express.Router();

// Register route using an inline function
router.post('/', async (req, res) => {
    const { email, username, password } = req.body;

    try {
        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database with the hashed password
        const [result] = await pool.query(
            'INSERT INTO users (email, username, password) VALUES (?, ?, ?)', 
            [email, username, hashedPassword]
        );

        // Log the result if necessary
        console.log('User created with ID:', result.insertId);

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error during sign-up:', error.message);
        res.status(500).json({ message: 'Sign-up failed' });
    }
});

module.exports = router;
