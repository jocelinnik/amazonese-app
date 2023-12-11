import { Mensagem } from "../dto/mensagem.model";
import { RedefinirSenhaParticipante } from "../dto/participante.model";
import { BACKEND_API_URL } from "../services/http.service";

type RedefinirSenhaInput = {
    cpf: string;
    fraseSecreta: string;
    novaSenha: string;
    repetirNovaSenha: string;
};

class RedefinirSenha {

    private static _instancia?: RedefinirSenha;

    private constructor(){}

    public async executar(input: RedefinirSenhaInput): Promise<Mensagem> {
        try{
            const {
                cpf,
                fraseSecreta,
                novaSenha,
                repetirNovaSenha
            } = input;

            if(cpf.length !== 11)
                throw new Error("O CPF deve ter 11 caracteres");
            if(novaSenha !== repetirNovaSenha)
                throw new Error("As senhas não conferem");

            const dadosRedefinirSenha: RedefinirSenhaParticipante = {
                cpf: cpf,
                frase_secreta_bruta: fraseSecreta,
                nova_senha_bruta: novaSenha
            };
            const resposta = await fetch(`${BACKEND_API_URL}/participantes/redefinir-senha`, {
                method: "POST",
                body: JSON.stringify(dadosRedefinirSenha),
                headers: {
                    "Content-Type": "application/json; charset=utf-8"
                }
            });

            return await resposta.json() as Mensagem;
        }catch(e: any){
            const erro = e as Error;

            return {
                tipo: "erro",
                texto: erro.message
            };
        }
    }

    public static singleton(): RedefinirSenha {
        if(!RedefinirSenha._instancia)
            RedefinirSenha._instancia = new RedefinirSenha();

        return RedefinirSenha._instancia;
    }
}

export { RedefinirSenha };
