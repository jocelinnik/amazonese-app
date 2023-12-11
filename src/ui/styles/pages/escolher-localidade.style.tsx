import { StyleSheet } from "react-native";

import cores from "../layout/cores.style";

const styles = StyleSheet.create({
    cabecalho: {
        backgroundColor: cores.LIGHT
    },
    tituloCabecalho: {
        fontWeight: "bold"
    },
    containerLocalidades: {
        flex: 1,
        width: "90%",
        alignSelf: "center"
    },
    scrollLocalidades: {
        maxHeight: "90%"
    }
});

export default styles;
