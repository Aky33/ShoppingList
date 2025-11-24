import { ShoppingList } from '../models/shopping-list.js';
import shoppingListService  from '../services/shopping-list-service.js';

class ShoppingListController {
    async list(req: any, res: any, next: any) {
        try {
            const list = await shoppingListService.list();
            res.json(list);
        } catch (err) {
            next(err);
        }
    }

    async get(req: any, res: any, next: any) {
        try {
            const { id } = req.params;
            const model = await shoppingListService.get(id);

            res.json(model);
        } catch (err) {
            next(err);
        }
    }

    async insert(req: any, res: any, next: any) {
        try {
            const { name } = req.body;
            const model = new ShoppingList({
                name,
                idOwner:req.user.id,
                isDeleted: false
            });

            await shoppingListService.insert(model);
            res.json(model._id);
        } catch (err) {
            next(err);
        }
    }
}

export default new ShoppingListController();