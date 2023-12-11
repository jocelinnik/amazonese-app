import { Dimensions, StyleSheet } from "react-native";

import CORES from "./cores.style";

const styles = StyleSheet.create({
    containerTela: {
        display: "flex",
        flexDirection: "column",
        minHeight: Dimensions.get("screen").height,
        backgroundColor: CORES.LIGHT
    }
});

export default styles;
