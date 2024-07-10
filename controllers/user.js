const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const User = require('../models/User.js');

// Get all users
router.get('/', async (req, res) => {
    try {
        res.json(await User.find());
    } catch (error) {
        res.status(400).json(error);
    }
});

// Get user by ID
router.get('/:id', async (req, res) => {
    try {
        res.json(await User.findById(req.params.id));
    } catch (error) {
        res.status(400).json(error);
    }
});

// Create a new user (Signup)
router.post('/new', async (req, res) => {
    try {
        const { userName, passWord, name } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ userName });
        if (existingUser) {
            console.log(`Signup error: Username ${userName} already exists.`);
            return res.status(400).json({ status: 400, msg: 'Username already exists.' });
        }

        // Hash the password
        const hashedPassword = bcrypt.hashSync(passWord, bcrypt.genSaltSync(10));

        // Create new user
        const newUser = new User({
            userName,
            passWord: hashedPassword,
            name
        });

        await newUser.save();

        console.log('Signup successful');
        res.status(201).json({
            status: 201,
            user: {
                id: newUser._id,
                userName: newUser.userName,
                name: newUser.name
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ status: 500, msg: 'Something went wrong. Please try again later.', error: error.message });
    }
});

// Update user by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json(error);
    }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.json(deletedUser);
    } catch (error) {
        res.status(400).json(error);
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const { userName, passWord } = req.body;
        const foundUser = await User.findOne({ userName });

        if (!foundUser) {
            return res.status(401).json({ status: 401, msg: 'Username not found.' });
        }

        const isAMatch = bcrypt.compareSync(passWord, foundUser.passWord);
        if (!isAMatch) {
            return res.status(401).json({ status: 401, msg: 'Password does not match.' });
        }

        res.status(200).json({
            status: 200,
            user: {
                id: foundUser._id,
                userName: foundUser.userName,
                name: foundUser.name
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ status: 500, msg: 'Something went wrong. Please try again later.', error: error.message });
    }
});

module.exports = router;