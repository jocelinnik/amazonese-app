import { FC, JSX } from "react";
import { StyleSheet } from "react-native";
import { Button, Text, } from "react-native-paper";

type BotaoComIconeProps = {
    texto: string;
    icone: string;
    onClick?: () => void;
};

const BotaoComIcone: FC<BotaoComIconeProps> = ({ icone, texto, onClick }): JSX.Element => {
    const styles = StyleSheet.create({
        content: {
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 8,
            paddingHorizontal: 2
        },
        label: {
            fontSize: 25
        },
        botaoComIconeStyle: {
            width: "100%",
            justifyContent: "center"
        },
        text: {
            color: "#ffffff", 
            fontSize: 18
        }
    });

    return (
        <Button
            mode="contained"
            buttonColor="#394048"
            contentStyle={styles.content}
            labelStyle={styles.label}
            style={styles.botaoComIconeStyle}
            icon={icone}
            onPress={onClick}
        >
            <Text style={styles.text}>{texto}</Text>
        </Button>
    );
};

export { BotaoComIcone };
