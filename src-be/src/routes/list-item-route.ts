import { Router } from 'express';
const router = Router();

import controller from '../controllers/list-item-controller.js';
import { validateBody, validateQuery } from '../middlewares/validace-middleware.js';
import { deleteSchema, findSchema, insertSchema, updateSchema } from '../schemas/list-item-schema.js';
import { auth } from '../middlewares/auth-middleware.js';


router.use(auth);

router.get('/find', validateQuery(findSchema), controller.find);
router.post('/insert', validateBody(insertSchema), controller.insert);
router.put('/update', validateBody(updateSchema), controller.update);
router.delete('/delete', validateBody(deleteSchema), controller.delete);

export default router;