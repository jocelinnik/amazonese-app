import { FC, JSX, ReactNode } from "react";
import { Dimensions, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type ContainerProps = {
    children: ReactNode | ReactNode[];
    style?: StyleProp<ViewStyle>;
};

const ContainerColuna: FC<ContainerProps> = ({ children, style }): JSX.Element => {

    return (
        <View style={[styles.containerColuna, style]}>
            {children}
        </View>
    );
};

const ContainerLinha: FC<ContainerProps> = ({ children, style }): JSX.Element => {

    return (
        <View style={[styles.containerLinha, style]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    containerColuna: {
        display: "flex",
        flexDirection: "column",
        gap: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    containerLinha: {
        display: "flex",
        flexDirection: "row",
        maxWidth: Dimensions.get("window").width,
        gap: 0.75,
        backgroundColor: '#fff',
    }
});

export { ContainerColuna, ContainerLinha };
