import { Router } from 'express';
const router = Router();

import shoppingListController from '../controllers/shopping-list-controller.js';
import { validateRequest } from '../middlewares/validace-middleware.js';
import { shoppingListFiltrSchema, shoppingListInputSchema } from '../schemas/shopping-list-schema.js';

router.get('/get', validateRequest(shoppingListFiltrSchema), shoppingListController.get);
router.get('/list', shoppingListController.list);
router.post('/insert', validateRequest(shoppingListInputSchema),  shoppingListController.insert);

export default router;