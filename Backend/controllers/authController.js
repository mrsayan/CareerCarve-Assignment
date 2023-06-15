import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config({ path: "config/config.env" });

// @desc    Sign up
// @route   POST /api/signup
export const signUp = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, message: 'Signed up successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Login
// @route   POST /api/login
export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await argon2.verify(user.password, req.body.password))) {
      return res.status(401).json({ success: false, message: 'Invaid email or password' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
    const catboyResponse = await axios.get('https://api.catboys.com/catboy');
    res.cookie('authToken', token, { httpOnly: true, maxAge: 3600000 });
    res.status(200).json({ success: true, message: catboyResponse.data.response });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Logout
// @route   POST /api/logout
export const logout = async (req, res) => {
  try {
    if (req.cookies.authToken) {
      res.clearCookie('authToken');
      res.status(200).json({ success: true, message: 'Logged out successfully' });
    } else {
      res.status(401).json({ success: false, message: 'Not authorized to access this route' });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}