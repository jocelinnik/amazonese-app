import { CommonActions } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useContext, useState, FC, JSX } from "react";
import { Image, View } from "react-native";
import { Button, Text } from "react-native-paper";

import logo from "../../../assets/amazonese-logo-nobg.png"
import { Mensagem } from "../../data/dto/mensagem.model";
import { RootStackParamList } from "../routes";
import { InputSenha } from "../../ui/components/input-senha";
import { InputTexto } from "../../ui/components/input-texto";
import { AlertasContext } from "../../ui/context/alertas.context";
import { AutenticacaoContext } from "../../ui/context/autenticacao.context";
import cores from "../../ui/styles/layout/cores.style";
import telaStyles from "../../ui/styles/layout/tela.style";

type RealizarLoginPageProps = NativeStackScreenProps<RootStackParamList, "RealizarLoginPage">;

const RealizarLoginPage: FC<RealizarLoginPageProps> = ({ navigation }): JSX.Element => {
    const [carregando, setCarregando] = useState<boolean>(false);
    const [cpf, setCpf] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const alertasContext = useContext(AlertasContext);
    const { entrar } = useContext(AutenticacaoContext);

    const onCriarPerfil = async (): Promise<void> => {
        navigation.navigate("CriarPerfilPage");
    };
    const onRedefinirSenha = async (): Promise<void> => {
        navigation.navigate("RedefinirSenhaPage");
    };
    const onSobreNos = async (): Promise<void> => {
        navigation.navigate("SobreNosPage");
    };
    const onLogin = async (): Promise<void> => {
        setCarregando(true);

        const dados = await entrar({
            cpf: cpf,
            senha_bruta: senha
        });

        setCarregando(false);
        if(dados){
            alertasContext.limparAlertas();
            alertasContext.adicionarAlerta(dados as Mensagem);

            return;
        }

        navigation.dispatch(CommonActions.reset({
            index: 0,
            key: "",
            routes: [{ name: "HomePage" }]
        }));
    };

    return (
        <View style={telaStyles.containerTela}>
            <View style={{
                flex: 1,
                justifyContent: "center",
                marginHorizontal: 20
            }}>
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
                <InputSenha id="senha" titulo="Senha *" valor={senha} setValor={setSenha} />

                <Button
                    mode="contained"
                    buttonColor={cores.DARK}
                    onPress={onLogin}
                    loading={carregando}
                    style={{
                        marginVertical: 5
                    }}
                >
                    Entrar
                </Button>
                <Button
                    mode="contained"
                    buttonColor={cores.GRAY.CONTRAST}
                    onPress={onRedefinirSenha}
                    loading={carregando}
                    style={{
                        marginVertical: 5
                    }}
                >
                    Redefinir Senha
                </Button>
                <Button
                    mode="contained"
                    buttonColor={cores.GRAY.DARK}
                    onPress={onCriarPerfil}
                    loading={carregando}
                    style={{
                        marginVertical: 5
                    }}
                >
                    Criar Perfil
                </Button>
                <Button
                    mode="contained"
                    buttonColor={cores.GRAY.CONTRAST}
                    loading={carregando}
                    onPress={onSobreNos}
                    style={{
                        marginVertical: 5
                    }}
                >
                    Leia mais sobre nós
                </Button>
            </View>
        </View>
    );
};

export { RealizarLoginPage };
