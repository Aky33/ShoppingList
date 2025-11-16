import { IShoppingList, ShoppingList } from '../models/shopping-list.js';

class ShoppingListService {
    async list(): Promise<IShoppingList[]> {
        return await ShoppingList.find();
    }

    async get(id: string): Promise<IShoppingList | null> {
        return await ShoppingList.findById(id);
    }

    async insert(model: IShoppingList) {
        await ShoppingList.insertMany(model);
    }
}

export default new ShoppingListService();