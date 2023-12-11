import { useState, Dispatch, FC, JSX, SetStateAction } from "react";
import { TextInput } from "react-native-paper";

type InputSenhaProps = {
    id: string;
    titulo: string;
    valor: string;
    setValor: Dispatch<SetStateAction<string>>;
};

const InputSenha: FC<InputSenhaProps> = ({ id, titulo, valor, setValor }): JSX.Element => {
    const [mostrarSenha, setMostrarSenha] = useState<boolean>(false);

    return (
        <TextInput
            id={id}
            label={titulo}
            value={valor}
            onChangeText={setValor}
            secureTextEntry={!mostrarSenha}
            right={(
                (mostrarSenha) 
                    ? <TextInput.Icon icon="eye-off" onPress={() => setMostrarSenha(false)} /> 
                    : <TextInput.Icon icon="eye" onPress={() => setMostrarSenha(true)} />
            )}
            style={{
                marginVertical: 10
            }}
        />
    );
};

export { InputSenha };
