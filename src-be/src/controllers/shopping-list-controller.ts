import { ShoppingList } from '../models/shopping-list.js';
import { ShoppingListFiltr, ShoppingListInput } from '../schemas/shopping-list-schema.js';
import shoppingListService  from '../services/shopping-list-service.js';

class ShoppingListController {
    async list(req: any, res: any, next: any) {
        try {
            //TODO listovat podle filtru

            const lists = await shoppingListService.list();
            res.json(lists);
        } catch (err) {
            next(err);
        }
    }

    async get(req: any, res: any, next: any) {
        try {
            const filtr = req.params as ShoppingListFiltr;
            const list = await shoppingListService.get(filtr.id);
            res.json(list);
        } catch (err) {
            next(err);
        }
    }

    async insert(req: any, res: any, next: any) {
        try {
            const input = req.body as ShoppingListInput;
            const model = new ShoppingList({
                name: input.name,
                idOwner: "idOwnera",    //TODO
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