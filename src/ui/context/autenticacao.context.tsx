import { createContext, useEffect, useState, FC, JSX, ReactNode } from "react";

import { Mensagem } from "../../data/dto/mensagem.model";
import {
    DadosParticipanteLogado,
    LoginParticipante,
    ParticipanteLogado,
    TokenParticipante
} from "../../data/dto/participante.model";
import { CacheService } from "../../data/services/cache.service";
import { BACKEND_API_URL } from "../../data/services/http.service";

type AutenticacaoContextProps = {
    participante?: DadosParticipanteLogado;
    getToken: () => Promise<TokenParticipante>;
    entrar: (dadosLogin: LoginParticipante) => Promise<undefined | Mensagem>;
    sair: () => Promise<void>;
};
type AutenticacaoProviderProps = {
    children: ReactNode;
};

const AutenticacaoContext = createContext({} as AutenticacaoContextProps);

const AutenticacaoProvider: FC<AutenticacaoProviderProps> = ({ children }): JSX.Element => {
    const [participante, setParticipante] = useState<DadosParticipanteLogado | undefined>(undefined);
    const sessionStorage = CacheService.singleton();

    const autenticar = async (dados: LoginParticipante): Promise<ParticipanteLogado | Mensagem> => {
        const resposta = await fetch(`${BACKEND_API_URL}/participantes/login`, {
            method: "POST",
            body: JSON.stringify(dados),
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            }
        });

        const dadosResposta = await resposta.json();
        if(resposta.ok)
            return dadosResposta as ParticipanteLogado;
        else
            return dadosResposta as Mensagem;
    };
    const validarCpf = async (cpf: string): Promise<void> => {
        if(cpf.length !== 11)
            throw new Error("O CPF deve ter 11 caracteres");
    };
    const entrar = async (dadosLogin: LoginParticipante): Promise<undefined | Mensagem> => {
        try{
            await validarCpf(dadosLogin.cpf);
            const resposta = await autenticar(dadosLogin);

            if("tipo" in resposta)
                return resposta as Mensagem;

            await sessionStorage.gravar("@amazonese:dadoslogin", dadosLogin);
            await sessionStorage.gravar("@amazonese:token", resposta.token);
            await sessionStorage.gravar("@amazonese:participante", resposta.participante);
            setParticipante(resposta.participante);
        }catch(e: any){
            const erro = e as Error;

            return {
                tipo: "erro",
                texto: erro.message
            };
        }
    };
    const getToken = async (): Promise<TokenParticipante> => {
        let token = await sessionStorage.recuperar("@amazonese:token") as TokenParticipante;
        if(token && Date.now() > token.expiracao){
            console.log("Token expirado, gerando um novo...");
            const dadosLogin = await sessionStorage.recuperar("@amazonese:dadoslogin") as LoginParticipante;
            const resposta = await autenticar(dadosLogin) as ParticipanteLogado;
            await sessionStorage.gravar("@amazonese:token", resposta.token);
            token = resposta.token;
        }

        return token;
    };
    const sair = async (): Promise<void> => {
        await sessionStorage.remover("@amazonese:dadoslogin");
        await sessionStorage.remover("@amazonese:token");
        await sessionStorage.remover("@amazonese:participante");
        setParticipante(undefined);
    };

    useEffect(() => {
        (async () => {
            const dadosParticipante = await sessionStorage.recuperar<DadosParticipanteLogado>("@amazonese:participante");
            setParticipante(dadosParticipante);
        })();
    }, []);

    return (
        <AutenticacaoContext.Provider value={{ participante, getToken, entrar, sair }}>
            {children}
        </AutenticacaoContext.Provider>
    );
};

export { AutenticacaoContext, AutenticacaoProvider };
