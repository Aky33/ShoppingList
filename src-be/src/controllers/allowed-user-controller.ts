import { AllowedUser } from '../models/allowed-user.js';
import service  from '../services/allowed-user-service.js';

class AllowedUserController {
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
            const { idShoppingList, idUser } = req.body;
            const model = new AllowedUser({
                idShoppingList,
                idUser
            });

            await service.insert(model);
            res.json(model._id);
        } catch (err) {
            next(err);
        }
    }
}

export default new AllowedUserController();