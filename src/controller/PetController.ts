import { Request, Response } from "express";
import type Pet from "../types/TypePet";
import EnumEspecie from "../Enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
import EnumPorte from "../Enum/EnumPorte";
let listaDePets: Pet[] = [];

let id = 0;
function geraId() {
  id = id + 1;
  return id;
}

export default class PetController {
    constructor(private repository: PetRepository){}

    async criaPet(req: Request, res: Response) {
        const { adotado, especie, dataDeNascimento, nome, porte } = <PetEntity>req.body;

        if(!Object.values(EnumEspecie).includes(especie)){
            return res.status(400).json({ error: "Especie inválida." });
        }

        if(porte && !(porte in EnumPorte)){
            return res.status(400).json({ error: "Porte inválido." });
        }

        const novoPet = new PetEntity(nome, especie, dataDeNascimento, adotado, porte);
        
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

    async adotaPet(req: Request, res: Response) {
        const { pet_id, adotante_id} = req.params;

        const { success, message } = await this.repository.adotaPet(
            Number(pet_id), 
            Number(adotante_id)
        );

        if(!success) {
            return res.status(400).json({ error: message });
        }

        return res.sendStatus(201);
    }

    async buscaPetPorCampoGenerico(req: Request, res: Response){
        const { campo, valor } = req.query;
        const listaDePets = await this.repository.buscaPetPorCampoGenerico(
            campo as keyof PetEntity,
            valor as string
        );
        
        return res.status(200).json(listaDePets);
    }
}