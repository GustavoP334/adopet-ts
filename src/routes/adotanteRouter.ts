import express from "express";
import { AppDataSource } from "../config/dataSource";
import AdotanteController from "../controller/AdotanteController";
import AdotanteRepository from "../repositories/AdotanteRepository";
const router = express.Router();
const adotanteRepository = new AdotanteRepository(
  AppDataSource.getRepository("AdotanteEntity")
);
const adotanteController = new AdotanteController(adotanteRepository);

router.post("/", async (req, res) => {
  try {
    await adotanteController.criaAdotante(req, res);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao criar adotante", detalhes: error });
  }
});

export default router;