interface NovoParticipante {
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    senha_bruta: string;
    frase_secreta_bruta: string;
}

interface LoginParticipante {
    cpf: string;
    senha_bruta: string;
}

interface RedefinirSenhaParticipante {
    cpf: string;
    frase_secreta_bruta: string;
    nova_senha_bruta: string;
}

interface TokenParticipante {
    access_token: string;
    expiracao: number;
}

interface DadosParticipanteLogado {
    cpf: string;
    nome: string;
}

interface ParticipanteLogado {
    token: TokenParticipante;
    participante: DadosParticipanteLogado;
}

export {
    DadosParticipanteLogado,
    LoginParticipante,
    NovoParticipante,
    ParticipanteLogado,
    RedefinirSenhaParticipante,
    TokenParticipante
};
