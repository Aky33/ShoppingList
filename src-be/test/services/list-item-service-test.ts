import { describe, beforeAll, afterEach, afterAll, it, expect, jest } from '@jest/globals';

import listItemService from '../../src/services/list-item-service.js';
import { IListItem, ListItem } from '../../src/models/list-item.js';

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
            { description: 'Milk', idShoppingList: shoppingListId, isDone: false },
            { description: 'Bread', idShoppingList: shoppingListId, isDone: false },
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
            { description: 'Eggs', idShoppingList: shoppingListId, isDone: false } as IListItem,
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
                { description: 'Eggs', idShoppingList: shoppingListId, isDone: false } as IListItem,
                userId
            )
        ).rejects.toBeInstanceOf(AuthError);

        expect(await ListItem.countDocuments()).toBe(0);
    });

    // ---------------- UPDATE ----------------
    it('aktualizuje položku, pokud je uživatel owner', async () => {
        jest
            .spyOn(shoppingListService, 'isOwner')
            .mockResolvedValue(true);

        const item = await ListItem.create({
            description: 'Milk',
            idShoppingList: shoppingListId,
            isDone: false
        });

        await listItemService.update(
            {
                _id: item._id,
                description: 'Milk (updated)',
                isDone: true
            } as IListItem,
            ownerId
        );

        const updated = await ListItem.findById(item._id);

        expect(updated).not.toBeNull();
        expect(updated!.description).toBe('Milk (updated)');
        expect(updated!.isDone).toBe(true);
    });

    it('neaktualizuje položku, pokud uživatel není owner', async () => {
        jest
            .spyOn(shoppingListService, 'isOwner')
            .mockResolvedValue(false);

        const item = await ListItem.create({
            description: 'Butter',
            idShoppingList: shoppingListId,
            isDone: false
        });

        await expect(
            listItemService.update(
                {
                    _id: item._id,
                    description: 'SHOULD NOT UPDATE'
                } as IListItem,
                userId
            )
        ).rejects.toBeInstanceOf(AuthError);

        const unchanged = await ListItem.findById(item.id);

        expect(unchanged!.description).toBe('Butter');
    });


    // ---------------- DELETE ----------------
    it('smaže položku, pokud je owner', async () => {
        jest
            .spyOn(shoppingListService, 'isOwner')
            .mockReturnValue(Promise.resolve(true));

        const item = await ListItem.create({
            description: 'Butter',
            idShoppingList: shoppingListId,
            isDone: false
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
