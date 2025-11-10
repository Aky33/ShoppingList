import { Schema, model, Document } from "mongoose";

export interface IShoppingList extends Document {
    name: string;
    idOwner: number;
    isDeleted: boolean;
}

const modelSchema = new Schema<IShoppingList>({
    name: { type: String, required: true},
    idOwner: { type: Number, required: true },
    isDeleted: { type: Boolean, required: true }
});

export const ShoppingList = model<IShoppingList>("ShoppingList", modelSchema);