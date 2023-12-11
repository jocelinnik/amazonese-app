import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState, FC, JSX } from "react";
import { ScrollView, View } from "react-native";
import { Icon, List, Text } from "react-native-paper";

import { Evento } from "../../data/dto/evento.model";
import { CacheService } from "../../data/services/cache.service";
import { RootStackParamList } from "../routes";
import telasStyles from "../../ui/styles/layout/tela.style";

type ListaEventosFavoritosPageProps = NativeStackScreenProps<RootStackParamList, "ListarEventosFavoritosPage">;

const ListarEventosFavoritosPage: FC<ListaEventosFavoritosPageProps> = ({ navigation }): JSX.Element => {
    const [eventosFavoritos, setEventosFavoritos] = useState<Evento[]>([]);
    const cacheStorage = CacheService.singleton();

    const onDetalhesEvento = async (evento: Evento): Promise<void> => {
        navigation.navigate("DetalhesEventoPage", evento);
    };

    useEffect(() => {
        (async () => {
            const eventosFavoritosCache = await cacheStorage.recuperar<Evento[]>("@amazonese:eventosfavoritos");
            if(eventosFavoritosCache && eventosFavoritosCache.length > 0)
                setEventosFavoritos(eventosFavoritosCache);
        })();
    }, []);

    return (
        <ScrollView>
            <View style={telasStyles.containerTela}>
                <View
                    style={{
                        marginTop: 20,
                        marginHorizontal: 20
                    }}
                >
                    <Text variant="headlineMedium">Seus eventos favoritos</Text>

                    <List.Section
                        style={{
                            marginTop: 20
                        }}
                    >
                        {
                            (eventosFavoritos.length > 0)
                                ? (
                                    eventosFavoritos.map((evento) => (
                                        <List.Item
                                            key={evento.id}
                                            title={evento.nome}
                                            description={`${evento.localidade.cidade}/${evento.localidade.uf}`}
                                            left={(props) => <List.Icon icon="heart-outline" />}
                                            onPress={() => onDetalhesEvento(evento)}
                                        />
                                    ))
                                  )
                                : (
                                    <View
                                        style={{
                                            flex: 1,
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginTop: 50,
                                        }}
                                    >
                                        <Icon source="alert-outline" size={100} />
                                        <Text variant="headlineSmall">Sem eventos favoritos</Text>
                                    </View>
                                  )
                        }
                    </List.Section>
                </View>
            </View>
        </ScrollView>
    );
};

export { ListarEventosFavoritosPage };
