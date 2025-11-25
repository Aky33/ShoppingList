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
        idUser: { type: 'string' }
    },
    required: ['idShoppingList', 'idUser'],
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