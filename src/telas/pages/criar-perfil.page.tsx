import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext, useState, FC, JSX } from "react";
import { Image, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button, Text } from "react-native-paper";

import logo from "../../../assets/amazonese-logo-nobg.png";
import { criarPerfil } from "../../data/casos-uso/criar-perfil.usecase";
import { RootStackParamList } from "../routes";
import { InputSenha } from "../../ui/components/input-senha";
import { InputTexto } from "../../ui/components/input-texto";
import { AlertasContext } from "../../ui/context/alertas.context";
import cores from "../../ui/styles/layout/cores.style";
import telaStyles from "../../ui/styles/layout/tela.style";

type CriarPerfilPageProps = NativeStackScreenProps<RootStackParamList, "CriarPerfilPage">;

const CriarPerfilPage: FC<CriarPerfilPageProps> = ({ navigation }): JSX.Element => {
    const [carregando, setCarregando] = useState<boolean>(false);
    const [nome, setNome] = useState<string>("");
    const [cpf, setCpf] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [telefone, setTelefone] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [repetirSenha, setRepetirSenha] = useState<string>("");
    const [fraseSecreta, setFraseSecreta] = useState<string>("");
    const [repetirFraseSecreta, setRepetirFraseSecreta] = useState<string>("");
    const alertasContext = useContext(AlertasContext);

    const onCriar = async (): Promise<void> => {
        setCarregando(true);
        const mensagem = await criarPerfil({
            nome: nome,
            cpf: cpf,
            email: email,
            telefone: telefone,
            senha: senha,
            repetirSenha: repetirSenha,
            fraseSecreta: fraseSecreta,
            repetirFraseSecreta: repetirFraseSecreta
        });

        setCarregando(false);
        alertasContext.limparAlertas();
        alertasContext.adicionarAlerta(mensagem);

        if(mensagem.tipo === "sucesso")
            navigation.navigate("RealizarLoginPage");
    };
    const onSobreNos = async (): Promise<void> => {
        navigation.navigate("SobreNosPage");
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

                    <InputTexto id="nome" titulo="Nome *" valor={nome} setValor={setNome} />
                    <InputTexto id="cpf" titulo="CPF *" valor={cpf} setValor={setCpf} />
                    <InputTexto id="email" titulo="E-mail *" valor={email} setValor={setEmail} />
                    <InputTexto id="telefone" titulo="Telefone *" valor={telefone} setValor={setTelefone} />
                    <InputSenha id="senha" titulo="Senha *" valor={senha} setValor={setSenha} />
                    <InputSenha id="repetirSenha" titulo="Repetir Senha *" valor={repetirSenha} setValor={setRepetirSenha} />
                    <InputTexto id="fraseSecreta" titulo="Frase Secreta *" valor={fraseSecreta} setValor={setFraseSecreta} textoDica="Defina uma frase que poderá ser utilizada para redefinir a sua senha de acesso. Ela deve ser pessoal e intransferível, então não compartilhe com ninguém." />
                    <InputTexto id="repetirFraseSecreta" titulo="Repetir Frase Secreta *" valor={repetirFraseSecreta} setValor={setRepetirFraseSecreta} textoDica="Repita a mesma frase secreta escrita no campo acima." />

                    <Button
                        mode="contained"
                        buttonColor={cores.DARK}
                        loading={carregando}
                        onPress={onCriar}
                        style={{
                            marginTop: 20
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
        </KeyboardAwareScrollView>
    );
};

export { CriarPerfilPage };
