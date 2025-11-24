import bcrypt from "bcrypt";

import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
    login: string
    password: string

    checkPassword(password: string): boolean
}

const modelSchema = new Schema({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

modelSchema.methods.checkPassword = async function(password: string)  {
    return await bcrypt.compare(password, this.password);
}

export const User = model<IUser>("User", modelSchema);