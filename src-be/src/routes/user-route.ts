import { Router } from 'express';
const router = Router();

import userController from '../controllers/user-controller.js';
import { validateParams } from '../middlewares/validace-middleware.js';
import { userGetSchema } from '../schemas/user-schema.js';
import { auth } from '../middlewares/auth-middleware.js';

router.use(auth);

router.get('/get', validateParams(userGetSchema), userController.get);
router.get('/list', userController.list);

export default router;