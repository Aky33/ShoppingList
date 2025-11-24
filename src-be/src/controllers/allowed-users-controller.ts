import { AllowedUser } from '../models/allowed-user.js';
import allowedUsersService  from '../services/allowed-users-service.js';

class AllowedUsersController {
    async list(req: any, res: any, next: any) {
        try {
            const list = await allowedUsersService.list();
            res.json(list);
        } catch (err) {
            next(err);
        }
    }

    async get(req: any, res: any, next: any) {
        try {
            const { id } = req.params;
            const model = await allowedUsersService.get(id);

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

            await allowedUsersService.insert(model);
            res.json(model._id);
        } catch (err) {
            next(err);
        }
    }
}

export default new AllowedUsersController();