import { Router } from 'express';
const router = Router();

import controller from '../controllers/allowed-user-controller.js';
import { validateBody, validateParams } from '../middlewares/validace-middleware.js';
import { allowedUserGetSchema, allowedUserInsertSchema } from '../schemas/allowed-user-schema.js';
import { auth } from '../middlewares/auth-middleware.js';

router.use(auth);

router.get('/get', validateParams(allowedUserGetSchema), controller.get);
router.get('/list', controller.list);
router.post('/insert', validateBody(allowedUserInsertSchema), controller.insert);

export default router;