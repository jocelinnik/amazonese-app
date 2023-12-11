import AsyncStorage from "@react-native-async-storage/async-storage";

class CacheService {

    private static _instancia?: CacheService;

    public async gravar<T>(chave: string, valor: T): Promise<void> {
        const valorSerializado = JSON.stringify(valor);
        await AsyncStorage.setItem(chave, valorSerializado);
    }

    public async recuperar<T>(chave: string): Promise<T | undefined> {
        const valorSerializado = await AsyncStorage.getItem(chave);
        if(valorSerializado)
            return JSON.parse(valorSerializado) as T;
    }

    public async remover(chave: string): Promise<void> {
        await AsyncStorage.removeItem(chave);
    }

    public async limpar(): Promise<void> {
        await AsyncStorage.clear();
    }

    public static singleton(): CacheService {
        if(!CacheService._instancia)
            CacheService._instancia = new CacheService();

        return CacheService._instancia;
    }
}

export { CacheService };
