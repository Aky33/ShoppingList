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
        idShoppingList: { type: 'string' },
        description: { type: 'string' }
    },
    required: ['idShoppingList', 'description'],
    additionalProperties: false
};

export const updateSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        idShoppingList: { type: 'string' },
        description: { type: 'string' }
    },
    required: ['id', 'idShoppingList', 'description'],
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