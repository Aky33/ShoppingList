import { IAllowedUser, AllowedUser } from '../models/allowed-user.js';

class AllowedUserService {
    async list(): Promise<IAllowedUser[]> {
        return await AllowedUser.find();
    }

    async get(id: string): Promise<IAllowedUser | null> {
        return await AllowedUser.findById(id);
    }

    async insert(model: IAllowedUser) {
        await AllowedUser.create(model);
    }
}

export default new AllowedUserService();