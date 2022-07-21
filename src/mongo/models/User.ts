import { Schema } from "mongoose";
import { IUser } from "../../types/types";
import mongoose from "mongoose";

export const UserSchema = new Schema<IUser>({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  parent_name: String,
  roles: [{ type: String, required: true }],
  phone: String,
  email: { type: String, required: true },
  avatar_color: { type: String, required: true },
  avatar: String,
});

export const UserModel = mongoose.model("User", UserSchema);
