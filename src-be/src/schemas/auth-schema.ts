export const registerSchema = {
    type: 'object',
    properties: {
        login: { type: 'string' },
        password: { type: 'string' }
    },
    required: ['login', 'password'],
    additionalProperties: false
};

export const loginSchema = {
    type: 'object',
    properties: {
        login: { type: 'string' },
        password: { type: 'string' }
    },
    required: ['login', 'password'],
    additionalProperties: false
};