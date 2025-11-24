import bcrypt from "bcrypt";

import { IUser, User } from '../models/user.js';
import { ValidationError } from '../models/errors/validation-error.js';

class UserService {
    async list(): Promise<IUser[]> {
        return await User.find();
    }

    async get(id: string | null, login: string | null): Promise<IUser | null> {
        return await User.findOne({id, login});
    }

    async insert(model: IUser) {
        const exists = await this.get(null, model.login );
        if (exists) throw new ValidationError("Login already used");
                    
        model.password = await bcrypt.hash(model.password, 10);
        
        await User.create(model);
    }
}

export default new UserService();