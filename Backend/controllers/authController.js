const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model defined

// Register a new user
const register = async (req, res) => {
    const { email, username, password } = req.body;

    try {
        // Check if the user already exists by email
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            email,
            username,
            password: hashedPassword
        });

        // Create a JWT token
        const token = jwt.sign({ userId: newUser.user_id, username: newUser.username }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        // Respond with success and the user ID and username
        res.status(201).json({ 
            message: 'User registered successfully', 
            token, 
            username: newUser.username 
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Log in a user
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create a JWT token
        const token = jwt.sign({ userId: user.user_id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        // Respond with the token and username
        res.status(200).json({ 
            token, 
            username: user.username 
        });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { register, login };
