import { Dimensions, StyleSheet } from "react-native";

import cores from "../layout/cores.style";

const eventoNaCidadeStyle = StyleSheet.create({
    containerEvento: {
        width: 280,
        height: 180,
        marginRight: 10,
        backgroundColor: cores.GRAY.CONTRAST,
        borderRadius: 20,
        padding: 20
    },
    nomeEvento: {
        maxWidth: 180,
        marginTop: "auto",
        fontSize: 20,
        color: cores.LIGHT,
        fontWeight: "bold"
    }
});

const eventosNaCidadeStyle = StyleSheet.create({
    container: {
        width: "95%",
        alignSelf: "center"
    },
    scrollContainer: {
        marginTop: 10
    },
});

const eventoExploreStyle = StyleSheet.create({
    containerEvento: {
        marginTop: 10,
        width: "48%",
        height: 180,
        backgroundColor: cores.GRAY.CONTRAST,
        borderRadius: 20,
        padding: 20
    },
    containerEventoMargemPar: {
        marginLeft: 0
    },
    containerEventoMargemImpar: {
        marginLeft: 10
    },
    nomeEvento: {
        maxWidth: 180,
        marginTop: "auto",
        fontSize: 18,
        color: cores.LIGHT,
        fontWeight: "bold"
    },
    nomeLocalidade: {
        color: cores.LIGHT,
        fontSize: 15
    }
});

const eventosExploreStyle = StyleSheet.create({
    container: {
        flex: 1,
        width: "95%",
        alignSelf: "center",
        marginTop: 10
    },
    scrollContainer: {
        maxHeight: "78%",
        alignSelf: "center",
        // marginTop: 10
    }
});

const placeholderBuscarEventosStyle = StyleSheet.create({
    containerPlaceholder: {
        height: 180,
        marginVertical: 10,
        paddingVertical: 20,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    textoPlaceholder: {
        marginBottom: 30,
        fontSize: 18
    }
});

const tituloSessaoEventosStyle = StyleSheet.create({
    titulo: {
        fontWeight: "bold",
        textAlign: "left"
    }
});

const mensagemSessaoEventosStyle = StyleSheet.create({
    containerMensagemSessaoEvento: {
        ...eventoNaCidadeStyle.containerEvento,
        width: Dimensions.get("window").width * 0.95
    },
    mensagemSessaoEvento: {
        ...eventoNaCidadeStyle.nomeEvento,
        maxWidth: Dimensions.get("window").width * 0.8
    }
});

export {
    eventoExploreStyle,
    eventosExploreStyle,
    eventoNaCidadeStyle,
    eventosNaCidadeStyle,
    mensagemSessaoEventosStyle,
    placeholderBuscarEventosStyle,
    tituloSessaoEventosStyle
};
