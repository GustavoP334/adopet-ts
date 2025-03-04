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
  await adotanteController.criaAdotante(req, res);
});

router.get("/", async (req, res) => {
  await adotanteController.listaAdotante(req, res);
});

router.put("/:id", async (req, res) => {
  await adotanteController.atualizaAdotante(req, res);
});

router.delete("/:id", async (req, res) => {
  await adotanteController.deletaAdotante(req, res);
});

router.patch("/:id", async (req, res) => {
  await adotanteController.atualizaEnderecoAdotante(req, res);
});

export default router;