import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FC, JSX } from "react";

import { Evento, Localidade } from "../../data/dto/evento.model";
import { CriarPerfilPage } from "../pages/criar-perfil.page";
import { DetalhesEventoPage } from "../pages/detalhes-evento.page";
import { EscolherLocalidadePage } from "../pages/escolher-localidade.page";
import { EventosLocalidadePage } from "../pages/eventos-localidade.page";
import { HomePage } from "../pages/home.page";
import { ListarEventosFavoritosPage } from "../pages/listar-eventos-favoritos.page";
import { PainelParticipantePage } from "../pages/painel-participante.page";
import { RealizarLoginPage } from "../pages/realizar-login.page";
import { RedefinirSenhaPage } from "../pages/redefinir-senha.page";
import { SobreNosPage } from "../pages/sobre-nos.page";

type RootStackParamList = {
    CriarPerfilPage: undefined;
    DetalhesEventoPage: Evento;
    EscolherLocalidadePage: undefined;
    EventosLocalidadePage: Localidade;
    HomePage: undefined;
    ListarEventosFavoritosPage: undefined;
    PainelParticipantePage: undefined;
    RealizarLoginPage: undefined;
    RedefinirSenhaPage: undefined;
    SobreNosPage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Router: FC = (): JSX.Element => {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomePage">
                <Stack.Screen
                    name="HomePage"
                    component={HomePage}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name="EscolherLocalidadePage"
                    component={EscolherLocalidadePage}
                    options={{
                        headerTitle: ""
                    }}
                />

                <Stack.Screen
                    name="DetalhesEventoPage"
                    component={DetalhesEventoPage}
                    options={{
                        headerTitle: ""
                    }}
                />

                <Stack.Screen
                    name="ListarEventosFavoritosPage"
                    component={ListarEventosFavoritosPage}
                    options={{
                        headerTitle: ""
                    }}
                />

                <Stack.Screen
                    name="RealizarLoginPage"
                    component={RealizarLoginPage}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name="CriarPerfilPage"
                    component={CriarPerfilPage}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name="RedefinirSenhaPage"
                    component={RedefinirSenhaPage}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name="SobreNosPage"
                    component={SobreNosPage}
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen
                    name="PainelParticipantePage"
                    component={PainelParticipantePage}
                    options={{
                        headerTitle: ""
                    }}
                />

                <Stack.Screen
                    name="EventosLocalidadePage"
                    component={EventosLocalidadePage}
                    options={{
                        headerTitle: ""
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export { RootStackParamList, Router };
