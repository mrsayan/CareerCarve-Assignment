import express from 'express';
import { editPhoneNumber } from '../controllers/userController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.put('/edit/phonenumber', authenticate, editPhoneNumber);

export default router;