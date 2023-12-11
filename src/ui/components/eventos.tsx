import * as Location from "expo-location";
import { useContext, useEffect, useState, FC, JSX } from "react";
import { FlatList, ScrollView, View } from "react-native";
import { ActivityIndicator, Icon, Surface, Text } from "react-native-paper";

import { pegarEventosNaLocalidade } from "../../data/casos-uso/pegar-eventos-localidaade.usecase";
import { pegarEventosProximos } from "../../data/casos-uso/pegar-eventos-proximos.usecase";
import { Evento } from "../../data/dto/evento.model";
import { listaUF } from "../../data/dto/lista-uf.model";
import { Mensagem } from "../../data/dto/mensagem.model";
import { AlertasContext } from "../context/alertas.context";
import {
    eventoExploreStyle,
    eventosExploreStyle,
    eventoNaCidadeStyle,
    eventosNaCidadeStyle,
    mensagemSessaoEventosStyle,
    placeholderBuscarEventosStyle,
    tituloSessaoEventosStyle
} from "../styles/components/eventos.style";
import cores from "../styles/layout/cores.style";

type TituloSessaoEventosProps = {
    titulo: string;
};
type MensagemSessaoEventosProps = {
    texto: string;
};
type PlaceholderBuscarEventosProps = {
    texto: string;
};
type EventosNaCidadeProps = {
    onDetalhesEvento: (evento: Evento) => void;
};
type EventoNaCidadeProps = {
    evento: Evento;
    onDetalhesEvento: (evento: Evento) => void;
};
type EventosExploreProps = {
    onDetalhesEvento: (evento: Evento) => void;
};
type EventoExploreProps = {
    evento: Evento;
    indice: number;
    onDetalhesEvento: (evento: Evento) => void;
};

const TituloSessaoEventos: FC<TituloSessaoEventosProps> = ({ titulo }): JSX.Element => {

    return (
        <Text variant="headlineSmall" style={tituloSessaoEventosStyle.titulo}>
            {titulo}
        </Text>
    );
};

const MensagemSessaoEventos: FC<MensagemSessaoEventosProps> = ({ texto }): JSX.Element => {

    return (
        <Surface mode="flat" elevation={1} style={mensagemSessaoEventosStyle.containerMensagemSessaoEvento}>
            <Text variant="bodyLarge" style={mensagemSessaoEventosStyle.mensagemSessaoEvento}>
                {texto}
            </Text>
        </Surface>
    );
};

const EventoNaCidade: FC<EventoNaCidadeProps> = ({ evento, onDetalhesEvento }): JSX.Element => {

    return (
        <Surface
            mode="flat"
            elevation={1}
            style={eventoNaCidadeStyle.containerEvento}
            onTouchEnd={() => onDetalhesEvento(evento)}
        >
            <Text variant="bodyLarge" style={eventoNaCidadeStyle.nomeEvento}>
                {evento.nome}
            </Text>
        </Surface>
    );
};

const PlaceholderBuscarEventos: FC<PlaceholderBuscarEventosProps> = ({ texto }): JSX.Element => {

    return (
        <View style={placeholderBuscarEventosStyle.containerPlaceholder}>
            <Text variant="labelLarge" style={placeholderBuscarEventosStyle.textoPlaceholder}>
                {texto}
            </Text>
            <ActivityIndicator animating size={100} color={cores.GRAY.DARK} />
        </View>
    );
};

const EventosNaCidade: FC<EventosNaCidadeProps> = ({ onDetalhesEvento }): JSX.Element => {
    const [buscando, setBuscando] = useState<boolean>(true);
    const [eventosNaLocalidade, setEventosNaLocalidade] = useState<Evento[]>([]);
    const alertasContext = useContext(AlertasContext);

    const onPegarLocalizacao = async (): Promise<string[]> => {
        const dadosLocation = await Location.getCurrentPositionAsync();
        const dadosGeocode = await Location.reverseGeocodeAsync({
            latitude: dadosLocation.coords.latitude,
            longitude: dadosLocation.coords.longitude
        });
        const { region, subregion } = dadosGeocode[0];

        return [listaUF[region as string], subregion as string];
    };
    const onColetarEventosNaLocalidade = async (): Promise<void> => {
        const { granted } = await Location.requestForegroundPermissionsAsync();
        if(!granted){
            return;
        }else{
            const [uf, cidade] = await onPegarLocalizacao();
            const resposta = await pegarEventosNaLocalidade(cidade, uf);

            if("tipo" in resposta){
                alertasContext.limparAlertas();
                alertasContext.adicionarAlerta(resposta as Mensagem);
            }else{
                setEventosNaLocalidade(() => [
                    ...(resposta as Evento[])
                ]);
            }
        }
    };

    useEffect(() => {
        (async () => {
            setBuscando(true);
            setTimeout(async () => {
                await onColetarEventosNaLocalidade();
                setBuscando(false);
            }), 3000;
        })();
    }, []);

    return (
        <View style={eventosNaCidadeStyle.container}>
            <TituloSessaoEventos titulo="Na sua cidade" />

            {
                (buscando)
                    ? (<PlaceholderBuscarEventos texto="Buscando eventos na sua cidade, aguarde..." />)
                    : (
                        <ScrollView
                            horizontal
                            style={eventosNaCidadeStyle.scrollContainer}
                            showsHorizontalScrollIndicator={false}
                        >
                            {
                                (eventosNaLocalidade.length > 0)
                                    ? (eventosNaLocalidade.map((evento, i) => (
                                        <EventoNaCidade key={i} evento={evento} onDetalhesEvento={onDetalhesEvento} />
                                        )))
                                    : (
                                        <MensagemSessaoEventos texto="Sem eventos na sua cidade!" />
                                      )
                            }
                        </ScrollView>
                      )
            }
        </View>
    );
};

const EventoExplore: FC<EventoExploreProps> = ({ evento, indice, onDetalhesEvento }): JSX.Element => {

    return (
        <Surface
            mode="flat"
            elevation={1}
            style={[
                eventoExploreStyle.containerEvento,
                (indice % 2 !== 0) 
                    ? eventoExploreStyle.containerEventoMargemImpar 
                    : eventoExploreStyle.containerEventoMargemPar
            ]}
            onTouchEnd={() => onDetalhesEvento(evento)}
        >
            <Text variant="bodyMedium" style={eventoExploreStyle.nomeEvento}>
                {evento.nome}
            </Text>
            <Text variant="bodyMedium" style={eventoExploreStyle.nomeLocalidade}>
                <Icon source="map-marker-outline" size={20} color={cores.LIGHT} />
                {`${evento.localidade.cidade} - ${evento.localidade.uf}`}
            </Text>
        </Surface>
    );
};

const EventosExplore: FC<EventosExploreProps> = ({ onDetalhesEvento }): JSX.Element => {
    const [buscando, setBuscando] = useState<boolean>(true);
    const [eventos, setEventos] = useState<Evento[]>([]);
    const alertasContext = useContext(AlertasContext);

    const onColetarEventosProximos = async (): Promise<void> => {
        const resposta = await pegarEventosProximos();

        if("tipos" in resposta){
            alertasContext.adicionarAlerta(resposta as Mensagem);
        }else{
            setEventos(() => [
                ...(resposta as Evento[])
            ]);
        }
    };

    useEffect(() => {
        (async () => {
            setBuscando(true);
            setTimeout(async () => {
                await onColetarEventosProximos();
                setBuscando(false);
            }, 3000);
        })();
    }, []);

    return (
        <View style={eventosExploreStyle.container}>
            <TituloSessaoEventos titulo="Explore!" />

            {
                (buscando)
                    ? (<PlaceholderBuscarEventos texto="Buscando eventos, aguarde..." />)
                    : (
                        (eventos.length > 0)
                            ? (
                                <FlatList
                                    data={eventos}
                                    renderItem={(item) => (
                                        <EventoExplore evento={item.item} indice={item.index} onDetalhesEvento={onDetalhesEvento} />
                                    )}
                                    numColumns={2}
                                    keyExtractor={(item) => item.nome}
                                    style={eventosExploreStyle.scrollContainer}
                                    showsVerticalScrollIndicator={false}
                                />
                              )
                            : (
                                <MensagemSessaoEventos texto="Sem eventos para exibir!" />
                              )
                      )
            }
        </View>
    );
};

export { EventosNaCidade, EventosExplore };
