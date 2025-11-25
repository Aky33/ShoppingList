import { Router } from 'express';
const router = Router();

import shoppingListController from '../controllers/shopping-list-controller.js';
import { validateBody, validateQuery } from '../middlewares/validace-middleware.js';
import { findSchema, insertSchema, deleteSchema } from '../schemas/shopping-list-schema.js';
import { auth } from '../middlewares/auth-middleware.js';

router.use(auth);

router.get('/find', validateQuery(findSchema), shoppingListController.find);
router.post('/insert', validateBody(insertSchema),  shoppingListController.insert);
router.delete('/delete', validateBody(deleteSchema),  shoppingListController.delete);

export default router;