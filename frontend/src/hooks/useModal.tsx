import { ReactNode, useState } from "react";

const useModal = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [children, setChildren] = useState<ReactNode>(null);

    const toggleModal = () => {
        setIsOpen(prevState => !prevState);
        console.log(isOpen);
    }

    return {
        isOpen,
        toggleModal,
        children,
        setChildren
    };
}

export default useModal;