import { Router } from 'express';
const router = Router();

import shoppingListController from '../controllers/shopping-list-controller.js';
import { validateBody, validateParams } from '../middlewares/validace-middleware.js';
import { shoppingListFiltrSchema, shoppingListInputSchema } from '../schemas/shopping-list-schema.js';
import { auth } from '../middlewares/auth-middleware.js';

router.use(auth);

router.get('/get', validateParams(shoppingListFiltrSchema), shoppingListController.get);
router.get('/list', shoppingListController.list);
router.post('/insert', validateBody(shoppingListInputSchema),  shoppingListController.insert);

export default router;