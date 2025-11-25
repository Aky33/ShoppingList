import { FilterQuery } from 'mongoose';
import { IShoppingList, ShoppingList } from '../models/shopping-list.js';
import { AuthError } from '../models/errors/auth-error.js';

class ShoppingListService {
    async exists(filters: FilterQuery<IShoppingList>): Promise<boolean> {
        const exists = await ShoppingList.exists(filters);
        return exists != null;
    }

    async find(filters: FilterQuery<IShoppingList>): Promise<IShoppingList[]> {
        return await ShoppingList.find(filters);
    }

    async insert(model: IShoppingList) {
        await ShoppingList.create(model);
    }

    async isOwner(userId: string, shoppingListId: string): Promise<boolean> {
        return await this.exists({ _id: shoppingListId, idOwner: userId });
    }

    async delete(id: string, userId: string) {
        if (!await this.isOwner(userId, id)) 
            throw new AuthError("Only owner can do this!");

        await ShoppingList.findByIdAndDelete(id);
    }
}

export default new ShoppingListService();