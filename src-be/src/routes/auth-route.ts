import { Router } from 'express';
const router = Router();

import authController from '../controllers/auth-controller.js';
import { auth } from '../middlewares/auth-middleware.js';

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', auth, authController.refresh);
router.post('/logout', auth, authController.logout);

export default router;