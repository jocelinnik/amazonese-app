import { FC, JSX } from "react";
import { Button } from "react-native-paper";

import { Localidade as LocalidadeModel } from "../../data/dto/evento.model";
import styles from "../styles/components/localidade.style";
import cores from "../styles/layout/cores.style";

type LocalidadeProps = {
    localidade: LocalidadeModel;
    onExibirEventos: (localidade: LocalidadeModel) => void;
};

const Localidade: FC<LocalidadeProps> = ({ localidade, onExibirEventos }): JSX.Element => {

    return (
        <Button
            mode="contained"
            buttonColor={cores.GRAY.LIGHT}
            style={styles.container}
            labelStyle={styles.texto}
            contentStyle={styles.espacamento}
            onPress={() => onExibirEventos(localidade)}
        >
            {`${localidade.cidade} - ${localidade.uf}`}
        </Button>
    )
};

export { Localidade };
