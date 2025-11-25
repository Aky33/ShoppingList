export const findSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' }
    },
    required: [],
    additionalProperties: false
};

export const insertSchema = {
    type: 'object',
    properties: {
        name: { type: 'string' }
    },
    required: ['name'],
    additionalProperties: false
};

export const deleteSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' }
    },
    required: ['id'],
    additionalProperties: false
};