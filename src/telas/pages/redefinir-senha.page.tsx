import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext, useState, FC, JSX } from "react";
import { Image, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Text } from "react-native-paper";

import logo from "../../../assets/amazonese-logo-nobg.png";
import { RedefinirSenha } from "../../data/casos-uso/redefinir-senha.usecase";
import { RootStackParamList } from "../routes";
import { InputSenha } from "../../ui/components/input-senha";
import { InputTexto } from "../../ui/components/input-texto";
import { AlertasContext } from "../../ui/context/alertas.context";
import cores from "../../ui/styles/layout/cores.style";
import telaStyles from "../../ui/styles/layout/tela.style";

type RedefinirSenhaPageProps = NativeStackScreenProps<RootStackParamList, "RedefinirSenhaPage">;

const RedefinirSenhaPage: FC<RedefinirSenhaPageProps> = ({ navigation }): JSX.Element => {
    const [carregando, setCarregando] = useState<boolean>(false);
    const [cpf, setCpf] = useState<string>("");
    const [fraseSecreta, setFraseSecreta] = useState<string>("");
    const [novaSenha, setNovaSenha] = useState<string>("");
    const [repetirNovaSenha, setRepetirNovaSenha] = useState<string>("");
    const alertasContext = useContext(AlertasContext);

    const onRedefinirSenha = async (): Promise<void> => {
        setCarregando(true);

        const useCase = RedefinirSenha.singleton();
        const mensagem = await useCase.executar({
            cpf: cpf,
            fraseSecreta: fraseSecreta,
            novaSenha: novaSenha,
            repetirNovaSenha: repetirNovaSenha
        });

        setCarregando(false);
        alertasContext.limparAlertas();
        alertasContext.adicionarAlerta(mensagem);
        if(mensagem.tipo === "sucesso")
            navigation.navigate("RealizarLoginPage");
    };

    return (
        <KeyboardAwareScrollView>
            <View style={{
                ...telaStyles.containerTela,
                paddingTop: 100,
                paddingBottom: 20,
            }}>
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "stretch",
                        marginHorizontal: 20
                    }}
                >
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: "center"
                    }}>
                        <Image
                            source={logo}
                            style={{
                                width: 100,
                                height: 100
                            }}
                        />
                        <Text
                            variant="displayMedium"
                            style={{
                                color: cores.GRAY.CONTRAST,
                                fontWeight: "bold",
                                marginVertical: 10
                            }}
                        >
                            Amazone-se
                        </Text>
                    </View>

                    <InputTexto id="cpf" titulo="CPF *" valor={cpf} setValor={setCpf} />
                    <InputTexto id="fraseSecreta" titulo="Frase Secreta *" valor={fraseSecreta} setValor={setFraseSecreta} textoDica="Sua frase secreta é pessoal e intransferível, então não compartilhe com ninguém!" />
                    <InputSenha id="novaSenha" titulo="Nova Senha *" valor={novaSenha} setValor={setNovaSenha} />
                    <InputSenha id="repetirNovaSenha" titulo="Repetir Nova Senha *" valor={repetirNovaSenha} setValor={setRepetirNovaSenha} />

                    <Button
                        mode="contained"
                        buttonColor={cores.DARK}
                        loading={carregando}
                        onPress={onRedefinirSenha}
                        style={{
                            marginVertical: 5
                        }}
                    >
                        Redefinir Senha
                    </Button>
                </View>
            </View>
        </KeyboardAwareScrollView>
    );
};

export { RedefinirSenhaPage };
