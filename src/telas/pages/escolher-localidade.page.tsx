import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState, FC, JSX } from "react";
import { FlatList, View } from "react-native";
import { Appbar } from "react-native-paper";

import localidades from "../../data/mocks/localizacoes.json";
import { Localidade as LocalidadeModel } from "../../data/dto/evento.model";
import { RootStackParamList } from "../routes";
import { CaixaBusca } from "../../ui/components/caixa-busca";
import { Localidade } from "../../ui/components/localidade";
import telaStyles from "../../ui/styles/layout/tela.style";
import styles from "../../ui/styles/pages/escolher-localidade.style";

type EscolherLocalidadePageProps = NativeStackScreenProps<RootStackParamList, "EscolherLocalidadePage">;

const EscolherLocalidadePage: FC<EscolherLocalidadePageProps> = ({ navigation }): JSX.Element => {
    const [localidadeBuscada, setLocalidadeBuscada] = useState<string>("");
    const localidadesFiltradas = (
        (localidadeBuscada)
            ? localidades.filter(loc => loc.cidade.includes(localidadeBuscada))
            : localidades
    );

    const onExibirEventos = (localidade: LocalidadeModel): void => {
        navigation.navigate("EventosLocalidadePage", localidade);
    }

    return (
        <View style={telaStyles.containerTela}>
            <Appbar.Header style={styles.cabecalho}>
                <Appbar.Content title="Escolha uma localização" titleStyle={styles.tituloCabecalho} />
            </Appbar.Header>

            <CaixaBusca
                placeholder="Busque manualmente"
                valor={localidadeBuscada}
                setValor={setLocalidadeBuscada}
            />

            <View style={styles.containerLocalidades}>
                <FlatList
                    data={localidadesFiltradas}
                    renderItem={(item) => (
                        <Localidade
                            key={item.index}
                            localidade={item.item}
                            onExibirEventos={onExibirEventos}
                        />
                    )}
                    keyExtractor={(item) => item.cidade}
                    style={styles.scrollLocalidades}
                />
            </View>
        </View>
    );
};

export { EscolherLocalidadePage };
