import { FilterQuery } from 'mongoose';
import { IAllowedUser, AllowedUser } from '../models/allowed-user.js';

class AllowedUserService {
    async find(filters: FilterQuery<IAllowedUser>): Promise<IAllowedUser[]> {
        return await AllowedUser.find(filters);
    }

    async insert(model: IAllowedUser) {
        await AllowedUser.create(model);
    }

    async delete(id: string) {
        await AllowedUser.findByIdAndDelete(id);
    }
}

export default new AllowedUserService();