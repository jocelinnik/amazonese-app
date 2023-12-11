import AsyncStorage from "@react-native-async-storage/async-storage";

class SessaoService {

    private static _instancia?: SessaoService;

    private constructor(){}

    public async adicionar<T>(chave: string, valor: string): Promise<void> {

    }

    public static singleton(): SessaoService {
        if(!SessaoService._instancia)
            SessaoService._instancia = new SessaoService();

        return SessaoService._instancia;
    }
}
const adicionar = async (chave: string, valor: string): Promise<void> => {
    await AsyncStorage.setItem(chave, valor);
};
const remover = async (chave: string): Promise<void> => {
    await AsyncStorage.removeItem(chave);
};
const recuperar = async (chave: string): Promise<string | null> => {
    return await AsyncStorage.getItem(chave);
};

export { adicionar, recuperar, remover };
