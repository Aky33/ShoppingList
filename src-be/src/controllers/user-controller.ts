import userService from "../services/user-service.js";

class UserController {
    async list(req: any, res: any, next: any) {
        try {
            const list = await userService.list();

            res.json(list);
        } catch (err) {
            next(err);
        }
    }

    async get(req: any, res: any, next: any) {
        try {
            const { id, login } = req.params;
            const model = await userService.get(id, login);

            res.json(model);
        } catch (err) {
            next(err);
        }
    }
}   

export default new UserController()