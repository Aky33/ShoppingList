import bcrypt from "bcrypt";

import { IUser, User } from '../models/user.js';
import { ValidationError } from '../models/errors/validation-error.js';
import { FilterQuery } from "mongoose";

class UserService {
    async exists(filters: FilterQuery<IUser>): Promise<boolean> {
        const exists = await User.exists(filters);
        return exists != null;
    }

    async find(filters: FilterQuery<IUser>): Promise<IUser[]> {
        return await User.find(filters);
    }

    async insert(model: IUser) {
        if (await this.exists({ login: model.login })) 
            throw new ValidationError("Login already used");
                    
        model.password = await bcrypt.hash(model.password, 10);
        await User.create(model);
    }
}

export default new UserService();