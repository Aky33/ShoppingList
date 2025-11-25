export const listItemGetSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' }
    },
    required: ['id'],
    additionalProperties: false
};

export const listItemInsertSchema = {
    type: 'object',
    properties: {
        idShoppingList: { type: 'string' },
        description: { type: 'string' }
    },
    required: ['idShoppingList', 'description'],
    additionalProperties: false
};