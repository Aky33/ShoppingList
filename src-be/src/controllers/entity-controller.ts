import { Entity } from '../models/entity.js';
import entityService  from '../services/entity-service.js';

class EntityController {
    async list(req: any, res: any, next: any) {
        try {
            const list = await entityService.list();
            res.json(list);
        } catch (err) {
            next(err);
        }
    }

    async get(req: any, res: any, next: any) {
        try {
            const { id } = req.params;
            const model = await entityService.get(id);

            res.json(model);
        } catch (err) {
            next(err);
        }
    }

    async insert(req: any, res: any, next: any) {
        try {
            const { idShoppingList, description } = req.body;
            const model = new Entity({
                idShoppingList,
                description,
                isDone: false
            });

            await entityService.insert(model);
            res.json(model._id);
        } catch (err) {
            next(err);
        }
    }
}

export default new EntityController();