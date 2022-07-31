import { Types } from "mongoose";

export interface IMaterial {
  id: Types.ObjectId;
  title: string;
  date_created: Date;
  date_changed: Date;
  data: Object;
  desc: string;
  author_id: Types.ObjectId;
  isActive: boolean;
  image: string;
  categories_ids: Types.ObjectId[];
  category_title: string;
  users_liked_ids: Types.ObjectId[];
  comments_ids: Types.ObjectId[];
}

export const ROLE = {
  admin: "admin",
  freeuser: "freeuser",
  member: "member",
};

export interface IUser {
  id: Types.ObjectId;
  first_name: string;
  last_name: string;
  parent_name: string;
  roles: string[];
  phone: string;
  email: string;
  avatar_color: string;
  avatar: string;
}

export interface ICategory {
  id: Types.ObjectId;
  name: string;
  title: string;
  icon: string;
  color: string;
  desc: string;
}

export interface IComment {
  id: Types.ObjectId;
  material_id: Types.ObjectId;
  createdAt: Date;
  text: string;
  user: Types.ObjectId;
}

export interface IMaterialsData {
  category: string;
  data: IMaterial[];
}
