export const allowedUsersGetSchema = {
    type: 'object',
    properties: {
        id: { type: 'string' }
    },
    required: ['id'],
    additionalProperties: false
};

export const allowedUsersInsertSchema = {
    type: 'object',
    properties: {
        idShoppingList: { type: 'string' },
        idUser: { type: 'string' }
    },
    required: ['idShoppingList', 'idUser'],
    additionalProperties: false
};