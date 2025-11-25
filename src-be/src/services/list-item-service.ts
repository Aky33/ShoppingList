import { FilterQuery } from 'mongoose';
import { IListItem, ListItem } from '../models/list-item.js';

import shoppingListService from './shopping-list-service.js';
import { AuthError } from '../models/errors/auth-error.js';
import { ValidationError } from '../models/errors/validation-error.js';

class ListItemService {
    async find(filters: FilterQuery<IListItem>): Promise<IListItem[]> {
        return await ListItem.find(filters);
    }

    async insert(model: IListItem, userId: string) {
        if (!shoppingListService.isOwner(userId, model.idShoppingList))
            throw new AuthError("Only owner can do this!");

        await ListItem.create(model);
    }

    async update(model: IListItem, userId: string) {
        if (!shoppingListService.isOwner(userId, model.idShoppingList as string))
            throw new AuthError("Only owner can do this!");

        await ListItem.findByIdAndUpdate(model);
    }

    async delete(id: string, userId: string) {
        const model = await ListItem.findById(id);

        if (!model)
            throw new ValidationError("Can't delete non-existent item");

        if (!shoppingListService.isOwner(userId, model.idShoppingList))
            throw new AuthError("Only owner can do this!");
        
        await ListItem.findByIdAndDelete(id);
    }
}

export default new ListItemService();