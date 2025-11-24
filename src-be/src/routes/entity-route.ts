import { Router } from 'express';
const router = Router();

import entityController from '../controllers/entity-controller.js';
import { validateBody, validateParams } from '../middlewares/validace-middleware.js';
import { entityGetSchema, entityInsertSchema } from '../schemas/entity-schema.js';
import { auth } from '../middlewares/auth-middleware.js';


router.use(auth);

router.get('/get', validateParams(entityGetSchema), entityController.get);
router.get('/list', entityController.list);
router.post('/insert', validateBody(entityInsertSchema), entityController.insert);

export default router;