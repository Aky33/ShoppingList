import { describe, beforeAll, afterEach, afterAll, it, expect, jest } from '@jest/globals';

import listItemService from '../../src/services/list-item-service.js';
import { ListItem } from '../../src/models/list-item.js';

import shoppingListService from '../../src/services/shopping-list-service.js';
import { AuthError } from '../../src/models/errors/auth-error.js';
import { ValidationError } from '../../src/models/errors/validation-error.js';

import {
    connect,
    clearDatabase,
    closeDatabase,
} from '../mongo-setup.js';

describe('ListItemService – integration', () => {
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

    // ---------------- FIND ----------------
    it('najde položky podle filtru', async () => {
        await ListItem.create([
            { description: 'Milk', idShoppingList: shoppingListId },
            { description: 'Bread', idShoppingList: shoppingListId },
        ]);

        const items = await listItemService.find({ description: 'Milk' });

        expect(items).toHaveLength(1);
        expect(items[0].description).toBe('Milk');
    });

    // ---------------- INSERT ----------------
    it('vloží položku, pokud je uživatel owner', async () => {
        jest
            .spyOn(shoppingListService, 'isOwner')
            .mockReturnValue(Promise.resolve(true));

        await listItemService.insert(
            { description: 'Eggs', idShoppingList: shoppingListId } as any,
            ownerId
        );

        const items = await ListItem.find();

        expect(items).toHaveLength(1);
        expect(items[0].description).toBe('Eggs');
    });

    it('neuloží položku, pokud uživatel není owner', async () => {
        jest
            .spyOn(shoppingListService, 'isOwner')
            .mockReturnValue(Promise.resolve(false));

        await expect(
            listItemService.insert(
                { description: 'Eggs', idShoppingList: shoppingListId } as any,
                userId
            )
        ).rejects.toBeInstanceOf(AuthError);

        expect(await ListItem.countDocuments()).toBe(0);
    });

    // ---------------- DELETE ----------------
    it('smaže položku, pokud je owner', async () => {
        jest
            .spyOn(shoppingListService, 'isOwner')
            .mockReturnValue(Promise.resolve(true));

        const item = await ListItem.create({
            description: 'Butter',
            idShoppingList: shoppingListId,
        });

        await listItemService.delete(item.id, ownerId);

        expect(await ListItem.countDocuments()).toBe(0);
    });

    it('vyhodí ValidationError při mazání neexistující položky', async () => {
        await expect(
            listItemService.delete('64b000000000000000000000', ownerId)
        ).rejects.toBeInstanceOf(ValidationError);
    });
});
