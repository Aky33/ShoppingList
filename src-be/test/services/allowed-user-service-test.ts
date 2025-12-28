import { describe, beforeAll, afterEach, afterAll, it, expect, jest } from '@jest/globals';

import allowedUserService from '../../src/services/allowed-user-service.js';
import { IAllowedUser, AllowedUser } from '../../src/models/allowed-user.js';

import shoppingListService from '../../src/services/shopping-list-service.js';
import { AuthError } from '../../src/models/errors/auth-error.js';
import { ValidationError } from '../../src/models/errors/validation-error.js';

import {
    connect,
    clearDatabase,
    closeDatabase,
} from '../mongo-setup.js';

describe('AllowedUserService – integration', () => {
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
    it('najde allowed users podle filtru', async () => {
        await AllowedUser.create([
            { idUser: 'u1', idShoppingList: shoppingListId },
            { idUser: 'u2', idShoppingList: shoppingListId }
        ]);

        const users = await allowedUserService.find({ idUser: 'u1' });

        expect(users).toHaveLength(1);
        expect(users[0].idUser).toBe('u1');
    });


    // ---------------- INSERT ----------------
    it('vloží allowed usera, pokud je uživatel owner', async () => {
        jest.spyOn(shoppingListService, 'isOwner').mockResolvedValue(true);

        await allowedUserService.insert(
            { idUser: 'user-2', idShoppingList: shoppingListId } as IAllowedUser,
            ownerId
        );

        expect(await AllowedUser.countDocuments()).toBe(1);
    });

    it('neumožní vložení allowed usera, pokud není owner', async () => {
        jest.spyOn(shoppingListService, 'isOwner').mockResolvedValue(false);

        await expect(
            allowedUserService.insert(
                { idUser: 'user-2', idShoppingList: shoppingListId } as IAllowedUser,
                userId
            )
        ).rejects.toBeInstanceOf(AuthError);

        expect(await AllowedUser.countDocuments()).toBe(0);
    });

    // ---------------- DELETE ----------------
    it('owner může odebrat allowed usera', async () => {
        jest.spyOn(shoppingListService, 'isOwner').mockResolvedValue(true);

        const entry = await AllowedUser.create({
            idUser: 'user-2',
            idShoppingList: shoppingListId
        });

        await allowedUserService.delete(entry.id, ownerId);

        expect(await AllowedUser.countDocuments()).toBe(0);
    });

    it('uživatel může odebrat sám sebe i když není owner', async () => {
        jest.spyOn(shoppingListService, 'isOwner').mockResolvedValue(false);

        const entry = await AllowedUser.create({
            idUser: userId,
            idShoppingList: shoppingListId
        });

        await allowedUserService.delete(entry.id, userId);

        expect(await AllowedUser.countDocuments()).toBe(0);
    });

    it('neumožní smazání allowed usera cizím uživatelem', async () => {
        jest.spyOn(shoppingListService, 'isOwner').mockResolvedValue(false);

        const entry = await AllowedUser.create({
            idUser: 'user-2',
            idShoppingList: shoppingListId
        });

        await expect(
            allowedUserService.delete(entry.id, 'random-user')
        ).rejects.toBeInstanceOf(AuthError);

        expect(await AllowedUser.countDocuments()).toBe(1);
    });

    it('vyhodí ValidationError při mazání neexistujícího záznamu', async () => {
        await expect(
            allowedUserService.delete('64b000000000000000000000', ownerId)
        ).rejects.toBeInstanceOf(ValidationError);
    });
});
