import { describe, beforeAll, afterEach, afterAll, it, expect, jest } from '@jest/globals';

import shoppingListService from '../../src/services/shopping-list-service.js';
import { IShoppingList, ShoppingList } from '../../src/models/shopping-list.js';

import { AuthError } from '../../src/models/errors/auth-error.js';
import { ValidationError } from '../../src/models/errors/validation-error.js';

import {
    connect,
    clearDatabase,
    closeDatabase,
} from '../mongo-setup.js';

describe('ShoppingListService – integration', () => {
    const userId = 'user-1';
    const ownerId = 'owner-1';
    const shoppingListId = 'list-1';

    beforeAll(async () => {
        await connect();
    });

    afterEach(async () => {
        await clearDatabase();
        jest.restoreAllMocks();
    });

    afterAll(async () => {
        await closeDatabase();
    });

    // ---------------- EXISTS ----------------
    it('exists vrátí true pokud shopping list existuje', async () => {
        const shoppingList = await ShoppingList.create({ idOwner: ownerId, name: 'test', isDeleted: false });

        expect(await shoppingListService.exists({ _id: shoppingList._id })).toBe(true);
    });

    // ---------------- FIND ----------------
    it('find vrátí shopping listy podle filtru', async () => {
        await ShoppingList.create({ idOwner: ownerId, name: 'test', isDeleted: false });

        const lists = await shoppingListService.find({ idOwner: ownerId });

        expect(lists).toHaveLength(1);
    });

    // ---------------- INSERT ----------------
    it('vloží shopping list', async () => {
        await shoppingListService.insert({ idOwner: ownerId, name: 'test', isDeleted: false } as IShoppingList);

        expect(await ShoppingList.countDocuments()).toBe(1);
    });

    // ---------------- DELETE ----------------
    it('owner může smazat shopping list', async () => {
        const list = await ShoppingList.create({ idOwner: ownerId, name: 'test', isDeleted: false });

        await shoppingListService.delete(list.id, ownerId);

        expect(await ShoppingList.countDocuments()).toBe(0);
    });

    it('neumožní smazání shopping listu ne-ownerovi', async () => {
        const list = await ShoppingList.create({ idOwner: ownerId, name: 'test', isDeleted: false });

        await expect(
            shoppingListService.delete(list.id, userId)
        ).rejects.toBeInstanceOf(AuthError);
    });
});
