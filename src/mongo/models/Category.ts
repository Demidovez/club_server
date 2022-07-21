import { Schema } from "mongoose";
import { ICategory } from "../../types/types";
import mongoose from "mongoose";
const ObjectId = Schema.Types.ObjectId;

export const CategorySchema = new Schema<ICategory>({
  title: { type: String, required: true },
  icon: { type: String, required: true },
  color: { type: String, required: true },
});

export const CategoryModel = mongoose.model("Category", CategorySchema);
