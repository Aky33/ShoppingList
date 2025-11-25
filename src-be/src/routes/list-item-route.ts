import { Router } from 'express';
const router = Router();

import controller from '../controllers/list-item-controller.js';
import { validateBody, validateParams } from '../middlewares/validace-middleware.js';
import { listItemGetSchema, listItemInsertSchema } from '../schemas/list-item-schema.js';
import { auth } from '../middlewares/auth-middleware.js';


router.use(auth);

router.get('/get', validateParams(listItemGetSchema), controller.get);
router.get('/list', controller.list);
router.post('/insert', validateBody(listItemInsertSchema), controller.insert);

export default router;