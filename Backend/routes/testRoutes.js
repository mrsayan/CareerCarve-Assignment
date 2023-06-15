import express from 'express';
import { submitTest } from '../controllers/testController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/submit-test', authenticate, submitTest);

export default router;