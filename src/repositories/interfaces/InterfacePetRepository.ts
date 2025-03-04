import PetEntity from "../../entities/PetEntity";
import EnumPorte from "../../Enum/EnumPorte";

export default interface InterfacePetRepository {
    criaPet(pet:PetEntity): void | Promise<void>;
    listaPet(): Array<PetEntity> | Promise<PetEntity[]>;
    atualizaPet(id:number, pet:PetEntity): Promise<{ success: boolean; message?: string }> | void;
    deletaPet(id:number, pet:PetEntity): Promise<{ success: boolean; message?: string }> | void;
    buscaPetPorCampoGenerico<Tipo extends keyof PetEntity>(
        campo:Tipo,
        valor:PetEntity[Tipo]
    ): Promise<PetEntity[]> | PetEntity[];
}