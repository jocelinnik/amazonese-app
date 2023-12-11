import { StatusBar } from "expo-status-bar";
import React, { FC, JSX } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Router } from "./src/telas/routes";
import { AlertasProvider } from "./src/ui/context/alertas.context";
import { AutenticacaoProvider } from "./src/ui/context/autenticacao.context";

const App: FC = (): JSX.Element => {

    return (
        <SafeAreaProvider>
            <StatusBar style="auto" translucent backgroundColor="transparent" />
            <AutenticacaoProvider>
                <AlertasProvider>
                    <Router />
                </AlertasProvider>
            </AutenticacaoProvider>
        </SafeAreaProvider>
    );
};

export default App;
