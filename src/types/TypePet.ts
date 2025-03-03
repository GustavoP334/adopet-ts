import EnumEspecie from "../Enum/EnumEspecie";

type Pet = {
    id: number;
    nome: string;
    especie: EnumEspecie;
    adotado: boolean;
    dataDeNascimento: Date;
}

export default Pet;