import { Router } from 'express';
const router = Router();

import authController from '../controllers/auth-controller.js';
import { validateBody } from '../middlewares/validace-middleware.js';
import { loginSchema, registerSchema } from '../schemas/auth-schema.js';
import { auth } from '../middlewares/auth-middleware.js';


router.post('/register', validateBody(registerSchema), authController.register);
router.post('/login', validateBody(loginSchema), authController.login);
router.post('/refresh', auth, authController.refresh);
router.post('/logout', auth, authController.logout);

export default router;