import axios from "axios";
import express from "express";
import mongoose from "mongoose";
import { CategoryModel } from "./mongo/models/Category";
import { MaterialModel } from "./mongo/models/Material";
import { UserModel } from "./mongo/models/User";
import { CommentModel } from "./mongo/models/Comment";

const app = express();
const port = process.env.PORT;

// Подключение к БД
mongoose.connect(process.env.MONGO_URL as string);
mongoose.Promise = global.Promise;

app.get("/get_materials", async (req, res) => {
  const materials = await MaterialModel.find();

  res.send(materials);
});

app.get("/get_materials/:category_id", async (req, res) => {
  const categoryId = req.params.category_id;

  const materials = await MaterialModel.find(
    {
      categories: { $in: categoryId },
    },
    { categories: 0 }
  );

  res.send(materials);
});

app.get("/get_users", async (req, res) => {
  const users = await UserModel.find();

  res.send(users);
});

app.get("/get_user/:email", async (req, res) => {
  const email = req.params.email;

  const user = await UserModel.findOne({ email: email });

  res.send(user);
});

app.get("/get_categories", async (req, res) => {
  const categories = await CategoryModel.find();

  res.send(categories);
});

app.get("/get_comments", async (req, res) => {
  const comments = await CommentModel.find();

  res.send(comments);
});

app.listen(port, () =>
  console.log(`Club server is listening on ${port}: ${new Date()}`)
);
