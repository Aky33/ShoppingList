import { JSONSchemaType } from "ajv";

export interface ShoppingListFiltr {
  id: number;
}

export const shoppingListFiltrSchema: JSONSchemaType<ShoppingListFiltr> = {
    type: 'object',
    properties: {
        id: { type: 'integer', minimum: 1 }
    },
    required: ['id'],
    additionalProperties: false
};

export interface ShoppingListInput {
  name: string;
  idOwner: number;
}

export const shoppingListInputSchema: JSONSchemaType<ShoppingListInput> = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        idOwner: { type: 'number' }
    },
    required: ['name', 'idOwner'],
    additionalProperties: false
};