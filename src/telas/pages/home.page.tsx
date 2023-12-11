import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext, useEffect, useState, FC, JSX } from "react";
import { View } from "react-native";
import { Appbar } from "react-native-paper";

import { BuscarEventosFavoritos } from "../../data/casos-uso/buscar-eventos-favoritos.usecase";
import { Evento } from "../../data/dto/evento.model";
import { CacheService } from "../../data/services/cache.service";
import { RootStackParamList } from "../routes";
import { BotaoComIcone } from "../../ui/components/botao-com-icone";
import { CaixaBusca } from "../../ui/components/caixa-busca";
import { EventosExplore, EventosNaCidade } from "../../ui/components/eventos";
import { AutenticacaoContext } from "../../ui/context/autenticacao.context";
import cabecalhoStyles from "../../ui/styles/layout/cabecalho.style";
import telaStyles from "../../ui/styles/layout/tela.style";
import styles from "../../ui/styles/pages/home.style";

type HomePageProps = NativeStackScreenProps<RootStackParamList, "HomePage">;

const HomePage: FC<HomePageProps> = ({ navigation }): JSX.Element => {
    const cacheStorage = CacheService.singleton();
    const useCase = BuscarEventosFavoritos.singleton();
    const [eventoBuscado, setEventoBuscado] = useState<string>("");
    const { participante, getToken } = useContext(AutenticacaoContext);

    const onPerfil = async (): Promise<void> => {
        if(!participante)
            navigation.navigate("RealizarLoginPage");
        else
            navigation.navigate("PainelParticipantePage");
    };
    const onListaEventosFavoritos = async (): Promise<void> => {
        if(!participante)
            navigation.navigate("RealizarLoginPage");
        else
            navigation.navigate("ListarEventosFavoritosPage");
    }
    const onTelaEscolherLocalizacao = async (): Promise<void> => {
        navigation.navigate("EscolherLocalidadePage");
    };
    const onTelaDetalhesEvento = async (evento: Evento): Promise<void> => {
        navigation.navigate("DetalhesEventoPage", evento);
    };

    useEffect(() => {
        (async () => {
            if(participante){
                const eventosFavoritos = await cacheStorage.recuperar("@amazonese:eventosfavoritos");
                if(!eventosFavoritos){
                    const token = await getToken();
                    const resposta = await useCase.executar({
                        cpf: participante.cpf,
                        token: token.access_token
                    });
    
                    if(!("tipo" in resposta) && resposta.length > 0){
                        await cacheStorage.gravar("@amazonese:eventosfavoritos", resposta);
                    }
                }
            }
        })();
    }, []);

    return (
        <View style={telaStyles.containerTela}>
            <Appbar.Header style={cabecalhoStyles.container}>
                <Appbar.Content
                    title={(participante) ? `Bem-vindo(a) ${participante.nome}` : ""}
                    titleStyle={cabecalhoStyles.titulo}
                />
                <View>
                    <MaterialCommunityIcons
                        name="account-circle"
                        size={40}
                        onPress={onPerfil}
                    />
                </View>
            </Appbar.Header>

            <CaixaBusca
                placeholder="Busque por um evento"
                valor={eventoBuscado}
                setValor={setEventoBuscado}
            />

            <View style={styles.containerSelecioneLocalidade}>
                <BotaoComIcone
                    icone="arrow-right"
                    texto="Selecione uma localidade"
                    onClick={onTelaEscolherLocalizacao}
                />
            </View>

            <View style={styles.containerAcoes}>
                <View style={styles.containerBotaoAcoes}>
                    <BotaoComIcone
                        icone="heart-outline"
                        texto="Favoritos"
                        onClick={onListaEventosFavoritos}
                    />
                </View>
                <View style={styles.containerBotaoAcoes}>
                    <BotaoComIcone
                        icone="bell-outline"
                        texto="Lembretes"
                    />
                </View>
            </View>

            <EventosNaCidade onDetalhesEvento={onTelaDetalhesEvento} />
            <EventosExplore onDetalhesEvento={onTelaDetalhesEvento} />
        </View>
    );
};

export { HomePage };
