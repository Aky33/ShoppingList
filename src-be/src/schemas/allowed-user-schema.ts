export const allowedUserGetSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' }
    },
    required: ['id'],
    additionalProperties: false
};

export const allowedUserInsertSchema = {
    type: 'object',
    properties: {
        idShoppingList: { type: 'string' },
        idUser: { type: 'string' }
    },
    required: ['idShoppingList', 'idUser'],
    additionalProperties: false
};