import { StyleSheet } from "react-native";

import cores from "../layout/cores.style";

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginVertical: 10
    },
    texto: {
        fontSize: 20,
        color: cores.GRAY.DARK
    },
    espacamento: {
        paddingVertical: 10
    }
});

export default styles;
