import { Schema, model, Document } from "mongoose";

export interface IListItem extends Document {
    idShoppingList: string
    description: string;
    isDone: boolean;
}

const modelSchema = new Schema<IListItem>({
    idShoppingList: { type: String, required: true},
    description: { type: String, required: true },
    isDone: { type: Boolean, required: true }
});

export const ListItem = model<IListItem>("ListItem", modelSchema);