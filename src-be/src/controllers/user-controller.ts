import userService from "../services/user-service";
import { User } from "../models/user";

class UserController {
    async list(req: any, res: any, next: any) {
        try {
            //TODO listovat podle filtru

            const lists = await userService.list();

            res.json(lists);
        } catch (err) {
            next(err);
        }
    }

    async get(req: any, res: any, next: any) {
        try {
            const { id, login } = req.params;
            const list = await userService.get(id, login);

            res.json(list);
        } catch (err) {
            next(err);
        }
    }
}   

export default new UserController()