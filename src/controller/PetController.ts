import { Request, Response } from "express";
import type Pet from "../types/TypePet";
import EnumEspecie from "../Enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
let listaDePets: Pet[] = [];

let id = 0;
function geraId() {
  id = id + 1;
  return id;
}

export default class PetController {
    constructor(private repository: PetRepository){}

    async criaPet(req: Request, res: Response) {
        const { adotado, especie, dataDeNascimento, nome } = <PetEntity>req.body;

        if(!Object.values(EnumEspecie).includes(especie)){
            return res.status(400).json({ error: "Especie inválida." });
        }

        const novoPet = new PetEntity(nome, especie, dataDeNascimento, adotado);
        
        await this.repository.criaPet(novoPet);

        return res.status(201).json(novoPet);
    }

    async listaPets(res: Response) {
        const listaDePets = await this.repository.listaPet();
        return res.status(200).json(listaDePets);
    }

    async atualizaPet(req: Request, res: Response) {
        const { id } = req.params;
        const {success, message} = await this.repository.atualizaPet(
            Number(id), 
            req.body as PetEntity
        );

        if(!success){
            return res.status(400).json({error: message});
        }
        return res.sendStatus(200);
    }

    async deletaPets(req: Request, res: Response) {
        const { id } = req.params;
        const {success, message} = await this.repository.deletaPet(
            Number(id)
        );

        if(!success){
            return res.status(400).json({error: message});
        }
        return res.sendStatus(200);
    }
}