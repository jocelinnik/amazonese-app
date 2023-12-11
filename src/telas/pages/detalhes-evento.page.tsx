import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext, useEffect, useState, FC, JSX } from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { Button, Icon, IconButton, Paragraph, Text } from "react-native-paper";

import { FavoritarEvento } from "../../data/casos-uso/favoritar-evento.usecase";
import { Evento as EventoModel } from "../../data/dto/evento.model";
import { CacheService } from "../../data/services/cache.service";
import { RootStackParamList } from "../routes";
import { AlertasContext } from "../../ui/context/alertas.context";
import { AutenticacaoContext } from "../../ui/context/autenticacao.context";
import cores from "../../ui/styles/layout/cores.style";

type DetalheEventoPageProps = NativeStackScreenProps<RootStackParamList, "DetalhesEventoPage">;

const DetalhesEventoPage: FC<DetalheEventoPageProps> = ({ route }): JSX.Element => {
    const [favorito, setFavorito] = useState<boolean>(false);
    const alertasContext = useContext(AlertasContext);
    const { participante, getToken } = useContext(AutenticacaoContext);
    const evento: EventoModel = route.params;
    const cacheStorage = CacheService.singleton();
    const favoritarEventoUseCase = FavoritarEvento.singleton();

    const onFavoritarEvento = async (): Promise<void> => {
        const token = await getToken();
        const mensagem = await favoritarEventoUseCase.executar({
            eventoParaFavoritar: {
                cpf_participante: participante?.cpf as string,
                id_evento: evento.id
            },
            token: token.access_token
        });

        alertasContext.limparAlertas();
        alertasContext.adicionarAlerta(mensagem);
        if(mensagem.tipo === "sucesso"){
            let eventosFavoritos = await cacheStorage.recuperar<EventoModel[]>("@amazonese:eventosfavoritos") as EventoModel[];
            if(eventosFavoritos)
                eventosFavoritos.push(evento);
            else
                eventosFavoritos = [evento];
            await cacheStorage.gravar("@amazonese:eventosfavoritos", eventosFavoritos);
            setFavorito(true);
        }
    };

    useEffect(() => {
        (async () => {
            const eventosFavoritosParticipante = await cacheStorage.recuperar<EventoModel[]>("@amazonese:eventosfavoritos");

            if(eventosFavoritosParticipante && eventosFavoritosParticipante.length > 0){
                const idx = eventosFavoritosParticipante.findIndex((ev) => ev.id === evento.id);
                setFavorito(idx >= 0);
            }
        })();
    }, []);

    return (
        <ScrollView
            contentContainerStyle={{
                flex: 1,
                backgroundColor: cores.LIGHT,
                paddingVertical: 20
            }}
        >
            <View
                style={{
                    height: 300,
                    alignSelf: "center"
                }}
            >
                <View
                    style={{
                        position: "absolute",
                        zIndex: 2,
                        bottom: 5,
                        right: 20
                    }}
                >
                    <IconButton
                        icon={(favorito) ? "heart" : "heart-outline"}
                        size={30}
                        containerColor={cores.LIGHT}
                        iconColor={cores.GRAY.CONTRAST}
                        onPress={onFavoritarEvento}
                        disabled={(favorito) || (!participante)}
                    />
                    <IconButton
                        icon="bell-outline"
                        size={30}
                        containerColor={cores.LIGHT}
                        iconColor={cores.GRAY.CONTRAST}
                    />
                </View>

                <ScrollView horizontal style={{ marginTop: 10, marginHorizontal: 10 }}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, i) => (
                        <View
                            key={i}
                            style={{
                                width: Dimensions.get("window").width * 0.95,
                                height: 290,
                                marginLeft: 0,
                                marginRight: 10,
                                backgroundColor: cores.GRAY.CONTRAST,
                                borderRadius: 35,
                                padding: 20
                            }}
                        />
                    ))}
                </ScrollView>
            </View>

            <Text
                variant="headlineMedium"
                style={{
                    marginHorizontal: 10,
                    marginTop: 20,
                    fontSize: 30,
                    fontWeight: "bold"
                }}
            >
                {evento.nome}
            </Text>

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    gap: 10,
                    width: "95%",
                    alignSelf: "center",
                    marginTop: 15
                }}
            >
                <View
                    style={{
                        backgroundColor: cores.GRAY.LIGHT,
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        borderRadius: 30,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignContent: "center",
                    }}
                >
                    <Icon
                        source="map-marker-outline"
                        size={20}
                        color={cores.DARK}
                    />
                    <Text
                        style={{
                            fontSize: 15,
                            color: cores.DARK
                        }}
                    >
                        {`${evento.localidade.cidade} - ${evento.localidade.uf}`}
                    </Text>
                </View>
                <View
                    style={{
                        backgroundColor: cores.GRAY.LIGHT,
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        borderRadius: 30,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignContent: "center",
                    }}
                >
                    <Icon
                        source="currency-usd"
                        size={20}
                        color={cores.DARK}
                    />
                    <Text
                        style={{
                            fontSize: 15,
                            color: cores.DARK
                        }}
                    >
                        {evento.preco}
                    </Text>
                </View>
            </View>

            <View
                style={{
                    width: "95%",
                    alignSelf: "center",
                    marginTop: 15
                }}
            >
                <Text
                    variant="labelLarge"
                    style={{
                        color: cores.DARK,
                        fontSize: 20,
                        fontWeight: "bold"
                    }}
                >
                    Período de realização
                </Text>
                <Text
                    variant="bodyLarge"
                    style={{
                        color: cores.GRAY.DARK
                    }}
                >
                    {
                        (evento.data_inicio === evento.data_fim)
                            ? `${new Date(evento.data_inicio).toLocaleDateString()}`
                            : `${new Date(evento.data_inicio).toLocaleDateString()} à ${new Date(evento.data_fim).toLocaleDateString()}`
                    }
                </Text>
            </View>

            <ScrollView
                style={{
                    width: "95%",
                    maxHeight: Dimensions.get("window").height * 0.3,
                    alignSelf: "center",
                    marginTop: 15
                }}
            >
                <Text
                    variant="labelLarge"
                    style={{
                        color: cores.DARK,
                        fontSize: 20,
                        fontWeight: "bold"
                    }}
                >
                    Descrição
                </Text>
                <Paragraph
                    style={{
                        color: cores.GRAY.DARK,
                        fontSize: 15,
                        textAlign: "justify",
                        overflow: "scroll"
                    }}
                >
                    {evento.descricao}
                </Paragraph>
            </ScrollView>

            <Button
                mode="contained"
                buttonColor={cores.GRAY.CONTRAST}
                style={{
                    marginTop: "auto",
                    marginHorizontal: 20
                }}
            >
                Comentários
            </Button>
        </ScrollView>
    );
};

export { DetalhesEventoPage };
