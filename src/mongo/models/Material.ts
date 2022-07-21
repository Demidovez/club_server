import { Schema } from "mongoose";
import { IMaterial } from "../../types/types";
import mongoose from "mongoose";
const ObjectId = Schema.Types.ObjectId;

export const MaterialSchema = new Schema<IMaterial>(
  {
    title: { type: String, required: true },
    data: Object,
    desc: String,
    author_id: ObjectId,
    isActive: Boolean,
    categories: [ObjectId],
  },
  { timestamps: true }
);

export const MaterialModel = mongoose.model("Material", MaterialSchema);
