import { Router } from 'express';
const router = Router();

import allowedUsersController from '../controllers/allowed-users-controller.js';
import { validateBody, validateParams } from '../middlewares/validace-middleware.js';
import { allowedUsersGetSchema, allowedUsersInsertSchema } from '../schemas/allowed-users-schema.js';
import { auth } from '../middlewares/auth-middleware.js';

router.use(auth);

router.get('/get', validateParams(allowedUsersGetSchema), allowedUsersController.get);
router.get('/list', allowedUsersController.list);
router.post('/insert', validateBody(allowedUsersInsertSchema), allowedUsersController.insert);

export default router;