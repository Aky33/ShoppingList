import { FilterQuery } from 'mongoose';
import { IShoppingList, ShoppingList } from '../models/shopping-list.js';
import service  from '../services/shopping-list-service.js';

class ShoppingListController {
    async find(req: any, res: any, next: any) {
        try {
            const filters: FilterQuery<IShoppingList> = {};
            if (req.query.id) filters["_id"] = req.query.id;

            const models = await service.find(filters);

            res.json(models);
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

            await service.insert(model);
            res.json({
                id: model._id,
                message: "Created"
            });
        } catch (err) {
            next(err);
        }
    }

    async delete(req: any, res: any, next: any) {
        try {
            const { id } = req.body;

            await service.delete(id);
            res.json({message: "Deleted"});
        } catch (err) {
            next(err);
        }
    }
}

export default new ShoppingListController();