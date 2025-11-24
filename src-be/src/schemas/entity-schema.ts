export const entityGetSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' }
    },
    required: ['id'],
    additionalProperties: false
};

export const entityInsertSchema = {
    type: 'object',
    properties: {
        idShoppingList: { type: 'string' },
        description: { type: 'string' }
    },
    required: ['idShoppingList', 'description'],
    additionalProperties: false
};