import {FC, ReactNode} from 'react';
import clsx from 'clsx';
import {useTheme} from "entities/theme";
import {Button} from "shared/ui/button";
import {VStack} from "shared/ui/stack";

import './modal.scss';

interface UploadModalProps {
    isOpen: boolean,
    onClose: () => void,
    children: ReactNode,
}

const UploadModal: FC<UploadModalProps> = ({isOpen, onClose, children}) => {
    const {theme} = useTheme()

    const modalClass = clsx('modal', {'modal-open': isOpen,});

    return (
        <VStack className={modalClass}>
            <Button variant='clickable-div' className="modal-overlay" onClick={onClose} />
            <VStack className={clsx("modal-content", theme)}>{children}</VStack>
        </VStack>
    );
};

export default UploadModal;
