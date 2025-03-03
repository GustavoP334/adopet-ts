import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import InterfacePetRepository from "./interfaces/InterfacePetRepository";

export default class PetRepository implements InterfacePetRepository{
    private repository: Repository<PetEntity>;

    constructor(repository: Repository<PetEntity>) {
        this.repository = repository;
    }

    criaPet(pet: PetEntity): void {
        this.repository.save(pet);
    }
    async listaPet(): Promise<PetEntity[]> {
        return await this.repository.find();
    }
    async atualizaPet(
        id: number,
        newData: PetEntity
    ): Promise<{ success: boolean; message?: string}> {
        try {
            const petToUpdate = await this.repository.findOne({ where: { id: id } });

            if(!petToUpdate) {
                return { success: false, message: 'Pet não encontrado' };
            }

            Object.assign(petToUpdate, newData);

            await this.repository.save(petToUpdate);

            return { success: true };
        } catch (error) {
            console.log(error);

            return {
                success: false,
                message: 'Erro ao atualizar o pet'
            }
        }
    }

    async deletaPet(id: number): Promise<{ success: boolean; message?: string}> {
        try {
            const petToUpdate = await this.repository.findOne({ where: { id: id } });

            if(!petToUpdate) {
                return { success: false, message: 'Pet não encontrado' };
            }

            await this.repository.remove(petToUpdate);

            return { success: true };
        } catch (error) {
            console.log(error);

            return {
                success: false,
                message: 'Erro ao deletar o pet'
            }
        }
    }
}