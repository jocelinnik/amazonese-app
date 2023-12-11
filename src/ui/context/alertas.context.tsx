import { createContext, useState, FC, JSX, ReactNode } from "react";
import { View } from "react-native";

import { Mensagem } from "../../data/dto/mensagem.model";
import { Alerta } from "../components/alerta";

type AlertasProviderProps = {
    children: ReactNode;
};
type AlertasContextProps = {
    adicionarAlerta: (mensagem: Mensagem) => void;
    limparAlertas: () => void;
};

const AlertasContext = createContext({} as AlertasContextProps);

const AlertasProvider: FC<AlertasProviderProps> = ({ children }): JSX.Element => {
    const [mensagens, setMensagens] = useState<Mensagem[]>([]);

    const adicionarAlerta = (mensagem: Mensagem): void => {
        setMensagens(mensagens => [
            ...mensagens,
            mensagem
        ]);
    };
    const limparAlertas = () => {
        setMensagens([]);
    };

    return (
        <AlertasContext.Provider value={{ adicionarAlerta, limparAlertas }}>
            {children}

            <View>
                {mensagens && mensagens.map((mensagem, i) => (
                    <Alerta key={i} mensagem={mensagem} />
                ))}
            </View>
        </AlertasContext.Provider>
    );
};

export { AlertasContext, AlertasProvider };
