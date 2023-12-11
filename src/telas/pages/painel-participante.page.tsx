import { CommonActions } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext, useEffect, useState, FC, JSX } from "react";
import { Image, View } from "react-native";
import { Button, Text } from "react-native-paper";

import logo from "../../../assets/amazonese-logo-nobg.png";
import { CacheService } from "../../data/services/cache.service";
import { RootStackParamList } from "../routes";
import { AutenticacaoContext } from "../../ui/context/autenticacao.context";
import cores from "../../ui/styles/layout/cores.style";
import telaStyles from "../../ui/styles/layout/tela.style";

type PainelParticipantePageProps = NativeStackScreenProps<RootStackParamList, "PainelParticipantePage">;

const PainelParticipantePage: FC<PainelParticipantePageProps> = ({ navigation }): JSX.Element => {
    const cacheStorage = CacheService.singleton();
    const [carregando, setCarregando] = useState<boolean>(false);
    const { participante, sair } = useContext(AutenticacaoContext);

    const irParaHome = (): void => {
        navigation.dispatch(CommonActions.reset({
            index: 0,
            key: "",
            routes: [{ name: "HomePage" }]
        }));
    };
    const onSair = async (): Promise<void> => {
        setCarregando(true);
        await sair();
        await cacheStorage.limpar();
        setCarregando(false);
        irParaHome();
    };
    const onSobreNos = async (): Promise<void> => {
        navigation.navigate("SobreNosPage");
    };

    useEffect(() => {
        if(!participante)
            irParaHome();
    }, []);

    return (
        <View>
            <View style={{
                ...telaStyles.containerTela,
                paddingHorizontal: 20,
                paddingTop: 100,
                paddingBottom: 20,
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

                <Button
                    mode="contained"
                    buttonColor={cores.GRAY.CONTRAST}
                    loading={carregando}
                    onPress={onSobreNos}
                    style={{
                        marginVertical: 10
                    }}
                >
                    Leia mais sobre nós
                </Button>
                <Button
                    mode="contained"
                    buttonColor={cores.DARK}
                    loading={carregando}
                    onPress={onSair}
                    style={{
                        marginVertical: 10
                    }}
                >
                    Sair
                </Button>
            </View>
        </View>
    )
};

export { PainelParticipantePage };
