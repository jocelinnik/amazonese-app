import { BACKEND_API_URL } from "../services/http.service";
import { Mensagem } from "../dto/mensagem.model";
import { LoginParticipante, ParticipanteLogado } from "../dto/participante.model";

const realizarLogin = async (input: LoginParticipante): Promise<ParticipanteLogado | Mensagem> => {
    try{
        const resposta = await fetch(`${BACKEND_API_URL}/participantes/login`, {
            method: "POST",
            body: JSON.stringify(input),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        });

        const dadosResposta = await resposta.json();
        if(resposta.ok)
            return dadosResposta as ParticipanteLogado;
        else
            return dadosResposta as Mensagem;
    }catch(e: any){
        const erro = e as Error;

        return {
            tipo: "erro",
            texto: erro.message
        };
    }
};

export { realizarLogin };
