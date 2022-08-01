import axios from "axios";
import express from "express";
import mongoose from "mongoose";
import { CategoryModel } from "./mongo/models/Category";
import { MaterialModel } from "./mongo/models/Material";
import { UserModel } from "./mongo/models/User";
import { CommentModel } from "./mongo/models/Comment";
import { IMaterial, IMaterialsData, TMaterialCard } from "./types/types";

const ObjectId = mongoose.Types.ObjectId;
const app = express();
const port = process.env.PORT;

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Подключение к БД
mongoose.connect(process.env.MONGO_URL as string);
mongoose.Promise = global.Promise;

app.get("/get_materials", async (req, res) => {
  const materials = await MaterialModel.find();

  res.send(materials);
});

app.get("/get_materials/:category_id", async (req, res) => {
  const categoryId = req.params.category_id;

  const materials = await MaterialModel.aggregate<IMaterial>([
    {
      $match: { categories_ids: new ObjectId(categoryId) },
    },
    {
      $addFields: {
        id: "$_id",
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "material_id",
        as: "comments_ids",
      },
    },
    {
      $project: {
        categories_ids: 0,
        _id: 0,
      },
    },
  ]);

  res.send(
    materials.map((material) => ({
      ...material,
      image: material.image
        ? `${process.env.BASE_IMAGE_URL}${material.image}`
        : "",
      comments_ids: material.comments_ids.map((comment) => comment._id),
    }))
  );
});

app.get("/get_materials_by_category_name/:category_name", async (req, res) => {
  const categoryName = req.params.category_name;

  const materials = await MaterialModel.aggregate<TMaterialCard>([
    {
      $lookup: {
        from: "categories",
        let: { categories_ids: "$categories_ids" },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $in: ["$_id", "$$categories_ids"] },
                  { $eq: ["$name", categoryName] },
                ],
              },
            },
          },
        ],
        as: "category",
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "material_id",
        as: "comments_ids",
      },
    },
    {
      $unwind: "$category",
    },
    {
      $addFields: {
        id: "$_id",
        category_title: "$category.title",
        comments_ids: "$comments_ids._id",
      },
    },
    {
      $project: {
        categories_ids: 0,
        category: 0,
        data: 0,
        isActive: 0,
        _id: 0,
      },
    },
  ]);

  const result: IMaterialsData = {
    category: (materials.length && materials[0].category_title) || "",
    data: materials.map((material) => ({
      ...material,
      image: material.image
        ? `${process.env.BASE_IMAGE_URL}${material.image}`
        : "",
    })),
  };

  res.send(result);
});

app.get("/get_material_by_name/:material_name", async (req, res) => {
  const materialName = req.params.material_name;

  const material = await MaterialModel.findOne<TMaterialCard>({
    name: materialName,
  });

  res.send(material);
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
