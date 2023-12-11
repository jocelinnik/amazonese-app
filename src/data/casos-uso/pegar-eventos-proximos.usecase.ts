import { BACKEND_API_URL } from "../services/http.service";
import { Evento } from "../dto/evento.model";
import { Mensagem } from "../dto/mensagem.model";

const pegarEventosProximos = async (): Promise<Evento[] | Mensagem> => {
    try{
        const resposta = await fetch(`${BACKEND_API_URL}/eventos/proximos`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        });

        const dadosResposta = await resposta.json();
        if(resposta.ok)
            return dadosResposta as Evento[];
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

export { pegarEventosProximos };
