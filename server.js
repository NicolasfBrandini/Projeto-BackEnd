import express from "express";
import postsRoutes from "./routes/postsRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import worksRouter from "./routes/worksRoutes.js";
import categoriasRouter from "./routes/categoriasRoutes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();

mongoose.connect(process.env.URI_MONGO);

app.use(express.json());

app.use("/api", postsRoutes);
app.use("/api", authRoutes);
app.use("/api", worksRouter);
app.use("/api", categoriasRouter);

app.listen(5000, () => {
  console.log("Servidor esta rodando");
});
