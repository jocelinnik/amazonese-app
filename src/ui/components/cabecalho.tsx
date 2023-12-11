import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FC, JSX } from "react";
import { View } from "react-native";
import { Appbar } from "react-native-paper";

const Cabecalho: FC = (): JSX.Element => {

    return (
        <Appbar.Header>
            <Appbar.Content title="Bem-vindo(a)" titleStyle={{fontWeight: "bold"}} />

            <View>
                <MaterialCommunityIcons
                    name="account-circle"
                    size={40}
                />
            </View>
        </Appbar.Header>
    );
};

export { Cabecalho };
