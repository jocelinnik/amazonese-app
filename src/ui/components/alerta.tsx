import { useState, FC, JSX } from "react";
import { Snackbar, } from "react-native-paper";

import { Mensagem } from "../../data/dto/mensagem.model";
import cores from "../styles/layout/cores.style";

type AlertaProps = {
    mensagem: Mensagem;
};

const Alerta: FC<AlertaProps> = ({ mensagem }): JSX.Element => {
    const [mostrar, setMostrar] = useState<boolean>(true);

    return (
        <Snackbar
            visible={mostrar}
            onDismiss={() => setMostrar(false)}
            duration={5000}
            style={{
                backgroundColor: (mensagem.tipo === "sucesso") ? cores.SUCCESS : cores.ERROR,
                margin: 10
            }}

        >
            {mensagem.texto}
        </Snackbar>
    );
};

export { Alerta };
