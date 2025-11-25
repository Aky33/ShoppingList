import { Router } from 'express';
const router = Router();

import controller from '../controllers/allowed-user-controller.js';
import { validateBody, validateQuery } from '../middlewares/validace-middleware.js';
import { findSchema, insertSchema, deleteSchema } from '../schemas/allowed-user-schema.js';
import { auth } from '../middlewares/auth-middleware.js';

router.use(auth);

router.get('/find', validateQuery(findSchema), controller.find);
router.post('/insert', validateBody(insertSchema), controller.insert);
router.delete('/delete', validateBody(deleteSchema), controller.delete);

export default router;