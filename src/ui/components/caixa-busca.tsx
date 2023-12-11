import { Dispatch, FC, JSX, SetStateAction } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

type CaixaBuscaProps = {
    placeholder: string;
    valor: string;
    setValor: Dispatch<SetStateAction<string>>;
};

const CaixaBusca: FC<CaixaBuscaProps> = ({ placeholder, valor, setValor }): JSX.Element => {
    const styles = StyleSheet.create({
        outline: {
            borderRadius: 20,
            borderColor: "#EFEFF1"
        },
        caixaBuscaStyle: {
            width: "95%",
            backgroundColor: "#EFEFF1",
            marginVertical: 20,
            alignSelf: "center"
        }
    });

    return (
        <TextInput
            mode="outlined"
            placeholder={placeholder}
            placeholderTextColor="#C2C2C2"
            right={<TextInput.Icon icon="magnify" color="#b0b0b0" />}
            outlineStyle={styles.outline}
            style={styles.caixaBuscaStyle}
            value={valor}
            onChangeText={(e) => setValor(e)}
        />
    );
};

export { CaixaBusca };
