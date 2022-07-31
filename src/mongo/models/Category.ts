import { Schema } from "mongoose";
import { ICategory } from "../../types/types";
import mongoose from "mongoose";
const ObjectId = Schema.Types.ObjectId;

export const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  title: { type: String, required: true },
  icon: { type: String, required: true },
  color: { type: String, required: true },
  desc: { type: String, required: false },
});

CategorySchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
  },
});

export const CategoryModel = mongoose.model("Category", CategorySchema);
