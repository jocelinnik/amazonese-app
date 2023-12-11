import { EventoParaFavoritar } from "../dto/evento.model";
import { Mensagem } from "../dto/mensagem.model";
import { BACKEND_API_URL } from "../services/http.service";

type FavoritarEventoInput = {
    eventoParaFavoritar: EventoParaFavoritar;
    token: string;
}

class FavoritarEvento {

    private static _instancia?: FavoritarEvento;

    private constructor(){}

    public async executar(input: FavoritarEventoInput): Promise<Mensagem> {
        try{
            const { eventoParaFavoritar, token } = input;
            const resposta = await fetch(`${BACKEND_API_URL}/eventos/favoritar`, {
                method: "POST",
                body: JSON.stringify(eventoParaFavoritar),
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    "Authorization": `Bearer ${token}`
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

    public static singleton(): FavoritarEvento {
        if(!FavoritarEvento._instancia)
            FavoritarEvento._instancia = new FavoritarEvento();

        return FavoritarEvento._instancia;
    }
}

export { FavoritarEvento };
