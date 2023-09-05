import express from "express";
import Work from "../models/WorksSchema.js";

const router = express.Router();

async function getAllWorks(req, res) {
  try {
    const post = await Work.find();
    console.log("Get feito com sucesso!");
    res.status(201).json(post);
  } catch (err) {
    console.log("Ocorreu um Erro!", err);
  }
}

async function saveWork(req, res) {
  try {
    const newPost = new Work({
      title: req.body.title,
      discription: req.body.discription,
      categories: req.body.categories,
    });
    await newPost.save();
    console.log("Work inserido com sucesso!");
    res.status(201).json({ message: "Criado com sucesso!" });
  } catch (err) {
    console.log("Ocorreu um Erro!", err);
  }
}

async function deleteWork(req, res) {
  const workId = req.params.id;
  const updateData = req.body;
  try {
    const work = await Work.deleteOne({ _id: workId }, updateData);
    console.log("Work foi deletado");
    res.status(201).json(work);
  } catch (err) {
    console.log("Ocorreu um Erro!", err);
  }
}

async function updateWork(req, res) {
  const workId = req.params.id;
  const updateData = req.body;

  try {
    const updatePost = await Work.updateOne({ _id: workId }, updateData);
    if (updatePost.nModified === 0) {
      res.status(404).send("Nenhum post foi encontrado no banco de dados!");
    } else {
      res.status(200).json({ message: "Work Atualido!" });
    }
  } catch (error) {
    console.log("Ocorreu um erro", erro);
    res.status(500).send(error);
  }
}

router.get("/works", getAllWorks);
router.post("/works", saveWork);
router.delete("/works/:id", deleteWork);
router.patch("/works/:id", updateWork);

export default router;
