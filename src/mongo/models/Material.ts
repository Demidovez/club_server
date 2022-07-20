import { Schema } from "mongoose";
import { IMaterial } from "../../types/types";
import mongoose from "mongoose";
const ObjectId = Schema.Types.ObjectId;

export const MaterialSchema = new Schema<IMaterial>({
  id: ObjectId,
  title: { type: String, required: true },
  date_created: { type: Number, required: true },
  date_changed: { type: Number, required: true },
  data: Object,
  desc: String,
  author_id: ObjectId,
  isActive: Boolean,
  categories: [ObjectId],
});

export const MaterialModel = mongoose.model("Material", MaterialSchema);
