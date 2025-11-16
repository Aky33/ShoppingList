import { JSONSchemaType } from "ajv";

export interface EntityFiltr {
  idShoppingList: string;
}

export const entityFiltrSchema: JSONSchemaType<EntityFiltr> = {
    type: 'object',
    properties: {
        idShoppingList: { type: 'string', minimum: 1 }
    },
    required: ['idShoppingList'],
    additionalProperties: false
};

export interface EntityInput {
    idShoppingList: string
    description: string;
    isDone: boolean;
}

export const entityInputSchema: JSONSchemaType<EntityInput> = {
    type: 'object',
    properties: {
        idShoppingList: { type: 'string' },
        description: { type: 'string' },
        isDone: { type: 'boolean' }
    },
    required: ['idShoppingList', 'description', 'isDone'],
    additionalProperties: false
};