import express from "express";
import Post from "../models/PostSchema.js";

const router = express.Router();

async function getAllPosts(req, res) {
  try {
    const post = await Post.find();
    console.log("Get feito com sucesso!");
    res.status(201).json(post);
  } catch (err) {
    console.log("Ocorreu um Erro!", err);
  }
}

async function savePost(req, res) {
  try {
    const newPost = new Post({
      title: req.body.title,
      discription: req.body.discription,
      categories: req.body.categories,
    });
    await newPost.save();
    console.log("Post inserido com sucesso!");
    res.status(201).json({ message: "Criado com sucesso!" });
  } catch (err) {
    console.log("Ocorreu um Erro!", err);
  }
}

async function deletePost(req, res) {
  const postId = req.params.id;
  const updateData = req.body;
  try {
    const post = await Post.deleteOne({ _id: postId }, updateData);
    console.log("Post inserido com sucesso!");
    res.status(201).json(post);
  } catch (err) {
    console.log("Ocorreu um Erro!", err);
  }
}

async function updatePost(req, res) {
  const postId = req.params.id;
  const updateData = req.body;

  try {
    const updatePost = await Post.updateOne({ _id: postId }, updateData);
    if (updatePost.nModified === 0) {
      res.status(404).send("Nenhum post foi encontrado no banco de dados!");
    } else {
      res.status(200).json({ message: "Post Atualido!" });
    }
  } catch (error) {
    console.log("Ocorreu um erro", erro);
    res.status(500).send(error);
  }
}

router.get("/posts", getAllPosts);
router.post("/posts", savePost);
router.delete("/posts/:id", deletePost);
router.patch("/posts/:id", updatePost);

export default router;
