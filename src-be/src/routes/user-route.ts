import { Router } from 'express';
const router = Router();

import userController from '../controllers/user-controller.js';
import { validateQuery } from '../middlewares/validace-middleware.js';
import { findSchema } from '../schemas/user-schema.js';
import { auth } from '../middlewares/auth-middleware.js';

router.use(auth);

router.get('/find', validateQuery(findSchema), userController.find);

export default router;