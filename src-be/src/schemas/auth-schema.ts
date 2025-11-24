export const authRegisterSchema = {
    type: 'object',
    properties: {
        login: { type: 'string' },
        password: { type: 'string' }
    },
    required: ['login', 'password'],
    additionalProperties: false
};

export const authLoginSchema = {
    type: 'object',
    properties: {
        login: { type: 'string', minimum: 1 },
        password: { type: 'string', minimum: 1 }
    },
    required: ['login', 'password'],
    additionalProperties: false
};