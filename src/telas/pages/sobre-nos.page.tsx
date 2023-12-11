import { FC, JSX } from "react";
import { Image, View } from "react-native";
import { Appbar, Button, Icon, Paragraph, Text } from "react-native-paper";

import logo from "../../../assets/amazonese-logo-nobg.png";
import cabecalhoStyles from "../../ui/styles/layout/cabecalho.style";
import cores from "../../ui/styles/layout/cores.style";
import telaStyles from "../../ui/styles/layout/tela.style";

const SobreNosPage: FC = (): JSX.Element => {

    return (
        <View style={telaStyles.containerTela}>
            <Appbar.Header style={cabecalhoStyles.container}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: 20
                    }}
                >
                    <View
                        style={{
                            backgroundColor: cores.GRAY.CONTRAST,
                            justifyContent: "center",
                            marginRight: 10,
                            padding: 5,
                            borderRadius: 10
                        }}
                    >
                        <Icon
                            source="alert-circle-outline"
                            size={30}
                            color={cores.LIGHT}
                        />
                    </View>
                    <Text
                        variant="headlineSmall"
                        style={{
                            fontSize: 15
                        }}
                    >
                        Quem somos
                    </Text>
                </View>
            </Appbar.Header>

            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Image
                    source={logo}
                    style={{
                        width: 100,
                        height: 100,
                    }}
                />
                <Text
                    variant="displayMedium"
                    style={{
                        color: cores.GRAY.CONTRAST,
                        fontWeight: "bold",
                        marginVertical: 50
                    }}
                >
                    Amazone-se
                </Text>
                <View
                    style={{
                        display: "flex",
                        gap: 10,
                        width: "50%"
                    }}
                >
                    <Button mode="contained" buttonColor={cores.GRAY.LIGHT} labelStyle={{ color: cores.GRAY.DARK, fontWeight: "900" }}>Facebook</Button>
                    <Button mode="contained" buttonColor={cores.GRAY.LIGHT} labelStyle={{ color: cores.GRAY.DARK, fontWeight: "900" }}>Instagram</Button>
                    <Button mode="contained" buttonColor={cores.GRAY.LIGHT} labelStyle={{ color: cores.GRAY.DARK, fontWeight: "900" }}>Youtube</Button>
                </View>
                <Paragraph
                    style={{
                        width: "75%",
                        textAlign: "center",
                        marginTop: 40
                    }}
                >
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat voluptate error 
                    mollitia tempora vero eum, ab, illum quos consequatur facilis porro, asperiores 
                    cupiditate? Quibusdam nihil quam eum voluptatibus vel unde.
                </Paragraph>
            </View>
        </View>
    );
};

export { SobreNosPage };
