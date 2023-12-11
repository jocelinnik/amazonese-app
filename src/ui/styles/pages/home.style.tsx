import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    containerSelecioneLocalidade: {
        width: "95%",
        alignSelf: "center"
    },
    containerAcoes: {
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        width: "95%",
        alignSelf: "center",
        gap: 5,
        marginVertical: 20
    },
    containerBotaoAcoes: {
        width: "49%",
        marginHorizontal: 0
    }
});

export default styles;
