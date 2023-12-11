import { BACKEND_API_URL } from "../services/http.service";
import { Mensagem } from "../dto/mensagem.model";
import { NovoParticipante } from "../dto/participante.model";

type CriarPerfilInput = {
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    senha: string;
    repetirSenha: string;
    fraseSecreta: string;
    repetirFraseSecreta: string;
};

const criarPerfil = async (input: CriarPerfilInput): Promise<Mensagem> => {
    let mensagem: Mensagem;

    try{
        if(input.cpf.length !== 11)
            throw new Error("O CPF deve ter 11 caracteres");
        if(input.senha !== input.repetirSenha)
            throw new Error("As senhas não conferem");
        if(input.fraseSecreta !== input.repetirFraseSecreta)
            throw new Error("As frases secretas não conferem");

        const dadosNovoPerfil: NovoParticipante = {
            nome: input.nome,
            cpf: input.cpf,
            email: input.email,
            telefone: input.telefone,
            senha_bruta: input.senha,
            frase_secreta_bruta: input.fraseSecreta
        };

        const resposta = await fetch(`${BACKEND_API_URL}/participantes/novo`, {
            method: "POST",
            body: JSON.stringify(dadosNovoPerfil),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        });

        return await resposta.json() as Mensagem;
    }catch(e: any){
        const erro = e as Error;

        mensagem = {
            tipo: "erro",
            texto: erro.message
        };
    }

    return mensagem;
};

export { criarPerfil };
