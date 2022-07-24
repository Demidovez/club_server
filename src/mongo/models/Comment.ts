import { Schema } from "mongoose";
import { IComment } from "../../types/types";
import mongoose from "mongoose";
const ObjectId = Schema.Types.ObjectId;

export const CommentSchema = new Schema<IComment>(
  {
    material_id: { type: ObjectId, required: true },
    text: { type: String, required: true },
    user: { type: ObjectId, required: true },
  },
  { timestamps: true }
);

CommentSchema.set("toJSON", {
  virtuals: true,
  transform: (_, ret) => {
    delete ret._id;
  },
});

export const CommentModel = mongoose.model("Comment", CommentSchema);
