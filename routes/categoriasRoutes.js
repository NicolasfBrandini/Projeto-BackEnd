import express from "express";
import Categorias from "../models/CategoriaSchema.js";

const router = express.Router();

async function getAllCategorias(req, res) {
  try {
    const catogorias = await Categorias.find();
    console.log("Get feito com sucesso!");
    res.status(201).json(catogorias);
  } catch (err) {
    console.log("Ocorreu um Erro!", err);
  }
}

async function saveCategorias(req, res) {
  try {
    const newCatogorias = new Categorias({
      title: req.body.title,
      discription: req.body.discription,
      categories: req.body.categories,
    });
    await newCatogorias.save();
    console.log("Categories inserido com sucesso!");
    res.status(201).json({ message: "Criado com sucesso!" });
  } catch (err) {
    console.log("Ocorreu um Erro!", err);
  }
}

async function deleteCategorias(req, res) {
  const categoriasId = req.params.id;
  const updateData = req.body;
  try {
    const categorias = await Categorias.deleteOne(
      { _id: categoriasId },
      updateData
    );
    console.log("Categorias deletada!");
    res.status(201).json(categorias);
  } catch (err) {
    console.log("Ocorreu um Erro!", err);
  }
}

async function updateCategorias(req, res) {
  const categoriasId = req.params.id;
  const updateData = req.body;

  try {
    const updateCategorias = await Categorias.updateOne(
      { _id: categoriasId },
      updateData
    );
    if (updateCategorias.nModified === 0) {
      res.status(404).send("Nenhum post foi encontrado no banco de dados!");
    } else {
      res.status(200).json({ message: "Categorias Atualido!" });
    }
  } catch (error) {
    console.log("Ocorreu um erro", erro);
    res.status(500).send(error);
  }
}

router.get("/categorias", getAllCategorias);
router.post("/categorias", saveCategorias);
router.delete("/categorias/:id", deleteCategorias);
router.patch("/categorias/:id", updateCategorias);

export default router;
