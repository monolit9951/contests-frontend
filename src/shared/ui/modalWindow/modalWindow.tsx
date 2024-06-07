import {FC, ReactNode} from 'react';
import clsx from 'clsx';
import {useTheme} from "entities/theme";
import xIcon from "shared/assets/icons/Secondary_btn.svg?react"
import {Icon} from "shared/ui/icon";
import {Flex, HStack, VStack} from "shared/ui/stack";

import './modalWindow.scss';

interface UploadModalProps {
    isOpen: boolean,
    onClose?: () => void,
    children: ReactNode,
    isOuterClose?: boolean | undefined,
    width?: string;
    height?: string;
    className?: string;
    overlayClassName?: string;
    modalContentClass?: string;
}

export const ModalWindow: FC<UploadModalProps> = ({ width, height, ...rest}) => {
    const {theme} = useTheme()

    const modalClass = clsx('modal', { 'modal-open': rest.isOpen }, rest.className);
    const overlayClass = clsx('modal-overlay', rest.overlayClassName);
    const modalContentClass = clsx("modal-content", rest.modalContentClass , theme)

    return (
        <VStack className={modalClass}>
            <div className='flex flex__row' style={{ width, height }}>
                <Flex className={overlayClass} clickFunction={rest.onClose} />
                <HStack className={modalContentClass}>
                    <VStack>{rest.children}</VStack>
                </HStack>
                { rest.isOuterClose && <Icon Svg={xIcon} clickable onClick={rest.onClose} /> }
            </div>
        </VStack>
    );
};

