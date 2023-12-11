import { Evento } from "../dto/evento.model";
import { Mensagem } from "../dto/mensagem.model";
import { BACKEND_API_URL } from "../services/http.service";

type BuscarEventosFavoritosInput = {
    cpf: string;
    token: string;
};

class BuscarEventosFavoritos {

    private static _instancia?: BuscarEventosFavoritos;

    private constructor(){}

    public async executar(input: BuscarEventosFavoritosInput): Promise<Evento[] | Mensagem> {
        try{
            const { cpf, token } = input;
            const resposta = await fetch(`${BACKEND_API_URL}/eventos/participante/${cpf}/favoritos`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": `Bearer ${token}`
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
    }

    public static singleton(): BuscarEventosFavoritos {
        if(!BuscarEventosFavoritos._instancia)
            BuscarEventosFavoritos._instancia = new BuscarEventosFavoritos();

        return BuscarEventosFavoritos._instancia;
    }
}

export { BuscarEventosFavoritos };
