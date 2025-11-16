import { JSONSchemaType } from "ajv";

export interface ShoppingListFiltr {
  id: string;
}

export const shoppingListFiltrSchema: JSONSchemaType<ShoppingListFiltr> = {
    type: 'object',
    properties: {
        id: { type: 'string', minimum: 1 }
    },
    required: ['id'],
    additionalProperties: false
};

export interface ShoppingListInput {
  name: string;
}

export const shoppingListInputSchema: JSONSchemaType<ShoppingListInput> = {
    type: 'object',
    properties: {
        name: { type: 'string' }
    },
    required: ['name'],
    additionalProperties: false
};