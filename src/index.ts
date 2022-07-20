import axios from "axios";
import express from "express";
import mongoose from "mongoose";
import { MaterialModel } from "./mongo/models/Material";
import { IMaterial } from "./types/types";

const app = express();
const port = process.env.PORT;

// Подключение к БД
mongoose.connect(process.env.MONGO_URL as string);
mongoose.Promise = global.Promise;

app.get("/get_materials", async (req, res) => {
  const materials = await MaterialModel.find();

  res.send(materials);
});

app.listen(port, () =>
  console.log(`Club server is listening on ${port}: ${new Date()}`)
);
