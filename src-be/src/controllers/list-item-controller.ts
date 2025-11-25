import { ListItem } from '../models/list-item.js';
import service  from '../services/list-item-service.js';

class ListItemController {
    async list(req: any, res: any, next: any) {
        try {
            const list = await service.list();
            res.json(list);
        } catch (err) {
            next(err);
        }
    }

    async get(req: any, res: any, next: any) {
        try {
            const { id } = req.params;
            const model = await service.get(id);

            res.json(model);
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

            await service.insert(model);
            res.json(model._id);
        } catch (err) {
            next(err);
        }
    }
}

export default new ListItemController();