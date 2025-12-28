import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    clearMocks: true,
    testMatch: [
        '**/*-test.ts',
    ],
    moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1'
    },
    globals: {
        'ts-jest': {
            useESM: true
        }
    }
};

export default config;
