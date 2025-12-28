import { describe, beforeAll, afterEach, afterAll, it, expect, jest } from '@jest/globals';

import userService from '../../src/services/user-service.js';
import { IUser, User } from '../../src/models/user.js';

import { ValidationError } from '../../src/models/errors/validation-error.js';

import {
    connect,
    clearDatabase,
    closeDatabase,
} from '../mongo-setup.js';

describe('UserService – integration', () => {
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
    it('exists vrátí true pokud uživatel existuje', async () => {
        await User.create({ login: 'test', password: 'x' });

        expect(await userService.exists({ login: 'test' })).toBe(true);
    });


    // ---------------- INSERT ----------------
    it('vloží nového uživatele a zahashuje heslo', async () => {
        await userService.insert({
            login: 'test',
            password: 'plain-password'
        } as IUser);

        const user = await User.findOne({ login: 'test' });

        expect(user).not.toBeNull();
        expect(user!.password).not.toBe('plain-password');
    });

    it('neumožní vložit uživatele s duplicitním loginem', async () => {
        await User.create({ login: 'test', password: 'x' });

        await expect(
            userService.insert({
                login: 'test',
                password: 'another'
            } as IUser)
        ).rejects.toBeInstanceOf(ValidationError);
    });
});
