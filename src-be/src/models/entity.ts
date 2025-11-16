import { Schema, model, Document } from "mongoose";

export interface IEntity extends Document {
    idShoppingList: string
    description: string;
    isDone: boolean;
}

const modelSchema = new Schema<IEntity>({
    idShoppingList: { type: String, required: true},
    description: { type: String, required: true },
    isDone: { type: Boolean, required: true }
});

export const Entity = model<IEntity>("Entity", modelSchema);