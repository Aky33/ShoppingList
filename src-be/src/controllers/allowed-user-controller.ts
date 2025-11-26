import { FilterQuery } from 'mongoose';
import { AllowedUser, IAllowedUser } from '../models/allowed-user.js';
import service  from '../services/allowed-user-service.js';

class AllowedUserController {
    async find(req: any, res: any, next: any) {
        try {
            const filters: FilterQuery<IAllowedUser> = {};
            if (req.query.id) filters["_id"] = req.query.id;

            const models = await service.find(filters);
            res.json(models);
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

            await service.insert(model, req.user.id);
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

            await service.delete(id, req.user.id);
            res.json({message: "Deleted"});
        } catch (err) {
            next(err);
        }
    }
}

export default new AllowedUserController();