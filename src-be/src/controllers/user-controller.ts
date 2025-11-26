import { FilterQuery } from "mongoose";
import { IUser } from "../models/user.js";
import service from "../services/user-service.js";

class UserController {
    async find(req: any, res: any, next: any) {
        try {
            const filters: FilterQuery<IUser> = {};
            if (req.query.id) filters["_id"] = req.query.id;
            if (req.query.login) filters["login"] = req.query.login;

            const models = await service.find(filters);
            models.map(model => model.password = "*****")

            res.json(models);
        } catch (err) {
            next(err);
        }
    }
}   

export default new UserController()