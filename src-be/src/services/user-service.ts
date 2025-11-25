import bcrypt from "bcrypt";

import { IUser, User } from '../models/user.js';
import { ValidationError } from '../models/errors/validation-error.js';
import { FilterQuery } from "mongoose";

class UserService {
    async find(filters: FilterQuery<IUser>): Promise<IUser[]> {
        return await User.find(filters);
    }

    async insert(model: IUser) {
        const exists = await this.find({ login: model.login });
        if (exists.length != 0) throw new ValidationError("Login already used");
                    
        model.password = await bcrypt.hash(model.password, 10);
        
        await User.create(model);
    }
}

export default new UserService();