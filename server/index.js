import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import connectDb from "./src/db/index.js";
import authRoutes from "./src/routes/auth.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import postRoutes from "./src/routes/posts.routes.js";
import { User } from "./src/models/user.models.js";
import { Post } from "./src/models/post.models.js";
import { users } from "./src/data/index.js";
import { posts } from "./src/data/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

connectDb()
  .then(async () => {
    app.listen(process.env.PORT || 3001, () => {
      console.log(`App is running on ${process.env.PORT || 3001}`);
    });

    try {
      const userCount = await User.countDocuments();
      if (userCount === 0) {
        await User.insertMany(users);
        await Post.insertMany(posts);
      }
    } catch (error) {
      if (error.code === 11000) {
        console.error("Duplicate key error:", error);
      } else {
        console.error("Failed to insert data:", error);
      }
    }
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
