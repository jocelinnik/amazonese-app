type TipoMensagem = "erro" | "sucesso";

interface Mensagem {
    tipo: TipoMensagem;
    texto: string;
}

export { Mensagem };
