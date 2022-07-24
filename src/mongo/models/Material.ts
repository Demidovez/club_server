import { IMaterial } from "../../types/types";
import mongoose, { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId;

export const MaterialSchema = new Schema<IMaterial>(
  {
    title: { type: String, required: true },
    data: Object,
    desc: String,
    author_id: ObjectId,
    isActive: Boolean,
    categories: [ObjectId],
    likes: [ObjectId],
  },
  { timestamps: true }
);

MaterialSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
  },
});

export const MaterialModel = mongoose.model("Material", MaterialSchema);
