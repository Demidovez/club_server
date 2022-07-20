import { Types } from "mongoose";

export interface IMaterial {
  id: Types.ObjectId;
  title: string;
  date_created: number;
  date_changed: number;
  data: Object;
  desc: string;
  author_id: Types.ObjectId;
  isActive: boolean;
  categories: Types.ObjectId[];
}
