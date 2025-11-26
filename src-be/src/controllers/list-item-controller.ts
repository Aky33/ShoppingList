import { FilterQuery } from 'mongoose';
import { IListItem, ListItem } from '../models/list-item.js';
import service  from '../services/list-item-service.js';

class ListItemController {
    async find(req: any, res: any, next: any) {
        try {
            const filters: FilterQuery<IListItem> = {};
            if (req.query.id) filters["_id"] = req.query.id;

            const models = await service.find(filters);

            res.json(models);
        } catch (err) {
            next(err);
        }
    }

    async insert(req: any, res: any, next: any) {
        try {
            const { idShoppingList, description } = req.body;
            const model = new ListItem({
                idShoppingList,
                description,
                isDone: false
            });

            await service.insert(model, req.user.id);
            res.json({
                id: model._id,
                message: "Created"
            });
        } catch (err) {
            next(err);
        }
    }

    async update(req: any, res: any, next: any) {
        try {
            const { id, idShoppingList, description } = req.body;
            const model = new ListItem({
                _id: id,
                idShoppingList,
                description,
                isDone: false
            });

            await service.update(model, req.user.id);
            res.json({message: "Updated"});
        } catch (err) {
            next(err);
        }
    }

    async delete(req: any, res: any, next: any) {
        try {
            const { id } = req.body;

            await service.delete(id, req.user.id);
            res.json({message: "Deleted"});
        } catch (err) {
            next(err);
        }
    }
}

export default new ListItemController();