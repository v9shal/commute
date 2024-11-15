const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const User = require('../models/userModel');

const register = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        
        // const salt = await bcryptjs.genSalt(10);
        // const hashedPassword = await bcryptjs.hash(password, salt);
        user = new User({ username, password});
        await user.save();
        
        const token = jwt.sign({ id: user._id }, process.env.jwt_secret, { expiresIn: '1h' });
        
        res.cookie('token', token, {
            httpOnly: true,          
            secure: process.env.NODE_ENV === 'production',           
            sameSite: 'None',       
            maxAge: 24 * 60 * 60 * 1000,  
          });
          
        res.status(201).json({ message: "User registered successfully",token,username });
    } catch (error) {
        next(error);
    }
};

// Login an existing user
const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: "no user found" });
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.jwt_secret, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,          
            secure: process.env.NODE_ENV === 'production',          
            sameSite: 'None',        
            maxAge: 24 * 60 * 60 * 1000,  
          });
          
        res.json({ message: "Logged in successfully", user: { id: user._id, username: user.username },token,username});

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: "An error occurred during login" });
    }
};

module.exports = { register, login };