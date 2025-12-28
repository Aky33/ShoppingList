import { FilterQuery } from 'mongoose';
import { IAllowedUser, AllowedUser } from '../models/allowed-user.js';

import shoppingListService from './shopping-list-service.js';
import { AuthError } from '../models/errors/auth-error.js';
import { ValidationError } from '../models/errors/validation-error.js';

class AllowedUserService {
    async find(filters: FilterQuery<IAllowedUser>): Promise<IAllowedUser[]> {
        return await AllowedUser.find(filters);
    }

    async insert(model: IAllowedUser, userId: string) {
        if (!await shoppingListService.isOwner(userId, model.idShoppingList))
            throw new AuthError("Only owner can do this!");

        await AllowedUser.create(model);
    }

    async delete(id: string, userId: string) {
        let isOwner = false;
        let removingMyself = false;
        const model = await AllowedUser.findById(id);
        
        if (!model)
            throw new ValidationError("Can't delete non-existent item");

        isOwner = await shoppingListService.isOwner(userId, model.idShoppingList);

        if (model.idUser == userId)
            removingMyself = true;

        if (!isOwner && !removingMyself)
            throw new AuthError("Unless you'r an owner, you can only remove yourself");

        await AllowedUser.findByIdAndDelete(id);
    }
}

export default new AllowedUserService();