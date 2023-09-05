import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.URI_MONGO);

const router = express.Router();

const authSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const Auth = mongoose.model("Auth", authSchema);

router.post("/auth", async (req, res) => {
  try {
    const query = await Auth.find({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    if (query) {
      res.status(200).json({ message: "Usuario Encontrado!" });
    }
  } catch (error) {}
});

export default router;
