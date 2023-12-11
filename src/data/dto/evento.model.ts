interface Localidade {
    cidade: string;
    uf: string;
}

interface Evento {
    id: string;
    nome: string;
    categorias: string[];
    preco: string;
    descricao: string;
    localidade: Localidade;
    data_inicio: Date;
    data_fim: Date;
}

interface EventoParaFavoritar {
    id_evento: string;
    cpf_participante: string;
}

export {
    Evento,
    EventoParaFavoritar,
    Localidade
};
