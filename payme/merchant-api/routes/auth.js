const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const Merchant = require('../models/Merchant');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

// Joi schema for validating registration data
const registerSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
    .required(),
});

// Joi schema for validating login data
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// POST /auth/register - Register a new merchant
router.post('/register', async (req, res) => {
  try {
    // Validate the request body
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { name, email, password } = req.body;

    // Check if the email already exists
    const existingMerchant = await Merchant.findOne({ email });
    if (existingMerchant) return res.status(400).json({ error: 'Email already in use' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new merchant to the database
    const merchant = new Merchant({ name, email, password: hashedPassword });
    await merchant.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /auth/login - Login an existing merchant
router.post('/login', async (req, res) => {
  try {
    // Validate the request body
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { email, password } = req.body;

    // Check if the merchant exists
    const merchant = await Merchant.findOne({ email });
    if (!merchant) return res.status(400).json({ error: 'Invalid email or password' });

    // Validate the password
    const validPassword = await bcrypt.compare(password, merchant.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid email or password' });

    // Generate JWT
    const token = jwt.sign({ id: merchant._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
