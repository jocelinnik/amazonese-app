import { forwardRef, useImperativeHandle, useState } from "react";
import { Button, Dialog, PaperProvider, Paragraph, Portal } from "react-native-paper";

type ModalRefProps = {
    exibirModal: () => void;
};
type ModalProps = {
    tituloModal: string;
    textoModal: string;
};

const Modal = forwardRef<ModalRefProps, ModalProps>(({ textoModal, tituloModal }, ref) => {
    const [mostrar, setMostrar] = useState<boolean>(false);

    const mostrarModal = (): void => setMostrar(true);
    const esconderModal = (): void => setMostrar(false);

    useImperativeHandle(ref, () => ({
        exibirModal: () => mostrarModal()
    }));

    return (
        <PaperProvider>
            <Portal>
                <Dialog visible={mostrar} onDismiss={esconderModal}>
                    <Dialog.Title>{tituloModal}</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>{textoModal}</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={esconderModal}>OK</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </PaperProvider>
    );
});

export { Modal };
