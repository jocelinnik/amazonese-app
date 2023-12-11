import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState, FC, JSX } from "react";
import { Dimensions, FlatList, ScrollView, View } from "react-native";
import { Button, Icon, Surface, Text } from "react-native-paper";

import eventos from "../../data/mocks/eventos.json";
import { Evento, Localidade } from "../../data/dto/evento.model";
import { RootStackParamList } from "../routes";
import cores from "../../ui/styles/layout/cores.style";
import telasStyle from "../../ui/styles/layout/tela.style";

type EventosLocalidadePageProps = NativeStackScreenProps<RootStackParamList, "EventosLocalidadePage">;

const EventosLocalidadePage: FC<EventosLocalidadePageProps> = ({ navigation, route }): JSX.Element => {
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>("Todos");
    const localidade: Localidade = route.params;
    const eventosNaLocalidade = (
        eventos
            .filter(evento => (
                evento.localidade.cidade === localidade.cidade &&
                evento.localidade.uf === localidade.uf
            ))
    );
    const eventosCategoria = (
        (categoriaSelecionada === "Todos")
            ? eventosNaLocalidade
            : eventosNaLocalidade
                .filter(evento => evento.categorias.includes(categoriaSelecionada))
    );
    const categorias = ["Todos", ...new Set(eventosNaLocalidade.flatMap(evento => evento.categorias))];
    console.log(eventosNaLocalidade);
    console.log(categorias);

    const onSelecionarCategoria = (categoria: string): void => {
        setCategoriaSelecionada(categoria);
    };
    const onExibirDetalhesEvento = (evento: Evento): void => {
        navigation.navigate("DetalhesEventoPage", evento);
    };

    return (
        <View style={telasStyle.containerTela}>
            <View
                style={{
                    marginTop: 15,
                    marginHorizontal: 10
                }}
            >
                <FlatList
                    data={categorias}
                    renderItem={(item) => (
                        <Button
                            key={item.index}
                            mode="contained"
                            style={{
                                backgroundColor: (
                                    (item.item === categoriaSelecionada) 
                                        ? cores.GRAY.CONTRAST 
                                        : cores.GRAY.LIGHT
                                ),
                                marginHorizontal: 5,
                                paddingHorizontal: 0,
                                paddingVertical: 0,
                                borderRadius: 30,
                                flexDirection: "row",
                                justifyContent: "center",
                                alignContent: "center",
                            }}
                            onPress={() => onSelecionarCategoria(item.item)}
                        >
                            <Text
                                style={{
                                    fontSize: 15,
                                    color: (
                                        (item.item === categoriaSelecionada)
                                            ? cores.LIGHT
                                            : cores.GRAY.DARK
                                    )
                                }}
                            >
                                {item.item}
                            </Text>
                        </Button>
                    )}
                    keyExtractor={(item) => item}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            <View
                style={{
                    width: "95%",
                    alignSelf: "center",
                }}
            >
                <ScrollView
                    horizontal
                    style={{
                        marginTop: 20
                    }}
                    showsHorizontalScrollIndicator={false}
                >
                    {eventosCategoria.map((evento, i) => (
                        <Surface
                            key={i}
                            mode="flat"
                            elevation={1}
                            style={{
                                marginTop: 50,
                                marginHorizontal: 5,
                                width: Dimensions.get("window").width * 0.94,
                                height: Dimensions.get("window").height * 0.6,
                                backgroundColor: cores.GRAY.CONTRAST,
                                borderRadius: 20,
                                padding: 20
                            }}
                            onTouchEnd={() => onExibirDetalhesEvento(evento)}
                        >
                            <View
                                style={{
                                    marginTop: "auto"
                                }}
                            >
                                <Text
                                    style={{
                                        color: cores.LIGHT,
                                        fontSize: 20,
                                        fontWeight: "bold",
                                        maxWidth: Dimensions.get("window").width * 0.6
                                    }}
                                >
                                    {evento.nome}
                                </Text>
                                <Text
                                    style={{
                                        color: cores.LIGHT,
                                        fontSize: 15,
                                        overflow: "hidden",
                                        textAlign: "justify",
                                        maxWidth: Dimensions.get("window").width
                                    }}
                                >
                                    {`${evento.descricao.slice(0, 150)}...`}
                                </Text>
                                <Text
                                    variant="bodyMedium"
                                    style={{
                                        color: cores.LIGHT,
                                        fontSize: 12,
                                        marginTop: 5
                                    }}
                                >
                                    <Icon source="map-marker-outline" size={20} color={cores.LIGHT} />
                                    {`${evento.localidade.cidade} - ${evento.localidade.uf}`}
                                </Text>
                            </View>
                        </Surface>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

export { EventosLocalidadePage };
