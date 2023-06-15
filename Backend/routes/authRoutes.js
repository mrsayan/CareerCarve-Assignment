import express from 'express';
import { signUp, login, logout } from '../controllers/authController.js';

const router = express.Router();

router.get('/welcome', async (req, res) => {
  try {
    res.status(200).json({ success: true, message: 'API successfully called' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', logout);

export default router;