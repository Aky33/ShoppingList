import { Schema, model, Document } from "mongoose";

export interface IAllowedUser extends Document {
    idShoppingList: string
    idUser: string
}

const modelSchema = new Schema({
  idShoppingList: { type: String, required: true },
  idUser: { type: String, required: true }
});

export const AllowedUser = model<IAllowedUser>("AllowedUser", modelSchema);