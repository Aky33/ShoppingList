import { FilterQuery } from 'mongoose';
import { IShoppingList, ShoppingList } from '../models/shopping-list.js';

class ShoppingListService {
    async find(filters: FilterQuery<IShoppingList>): Promise<IShoppingList[]> {
        return await ShoppingList.find(filters);
    }

    async insert(model: IShoppingList) {
        await ShoppingList.create(model);
    }

    async delete(id: string) {
        await ShoppingList.findByIdAndDelete(id);
    }
}

export default new ShoppingListService();