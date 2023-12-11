import { Dispatch, FC, JSX, SetStateAction } from "react";
import { View } from "react-native";
import { Text, TextInput } from "react-native-paper";

type InputTextoProps = {
    id: string;
    titulo: string;
    valor: string;
    setValor: Dispatch<SetStateAction<string>>;
    textoDica?: string;
};

const InputTexto: FC<InputTextoProps> = ({ id, titulo, valor, setValor, textoDica }): JSX.Element => {

    return (
        <View>
            <TextInput
                id={id}
                label={titulo}
                value={valor}
                onChangeText={setValor}
                style={{
                    marginVertical: 10
                }}
            />
            {textoDica && (
                <Text variant="bodySmall">{textoDica}</Text>
            )}
        </View>
    );
};

export { InputTexto };
