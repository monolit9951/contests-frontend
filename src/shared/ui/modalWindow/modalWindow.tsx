import React, { FC, ReactNode, useEffect, useState } from 'react'
import clsx from 'clsx'
import { useTheme } from 'entities/theme'
import xIcon from 'shared/assets/icons/Secondary_btn.svg?react'
import { Icon } from 'shared/ui/icon'
import { Flex, HStack, VStack } from 'shared/ui/stack'

import './modalWindow.scss'

interface UploadModalProps {
    isOpen: boolean
    onClose?: () => void
    children: ReactNode
    isOuterClose?: boolean
    width?: string
    height?: string
    maxWidth?: string
    maxHeight?: string
    className?: string
    overlayClassName?: string
    modalContentClass?: string
}

export const ModalWindow: FC<UploadModalProps> = ({
    width,
    height,
    maxWidth,
    maxHeight,
    ...rest
}) => {
    const { theme } = useTheme()

    const modalClass = clsx(
        'modal',
        { 'modal-open': rest.isOpen },
        rest.className
    )


    // статус анимации
    const [hideAnimation, setHideAnimation] = useState<boolean>(false)

    // для анимированного анмаунта 
    const handleClose = () =>{
        setHideAnimation(true)
        if(rest.onClose){
            setTimeout(() => {
                setHideAnimation(false)
                rest.onClose()
            }, 300);
        }
    }

    // БЛОКИРОВКА СКОЛЛА
    useEffect(() => {
        const body = document.body as HTMLElement
        if (rest.isOpen) {
            body.classList.add('no-scroll')
        }

        return () => {
            body.classList.remove('no-scroll')
        }
    }, [rest.isOpen])

    if (!rest.isOpen) {
        return null
    }

    const overlayClass = clsx('modal-overlay', {hide: hideAnimation}, rest.overlayClassName)
    const modalContentClass = clsx('modal-content', {hide: hideAnimation}, rest.modalContentClass, theme)

    return (
        <VStack className={modalClass}>
            <div className='modal-wrapper' style={{ width, height, maxWidth, maxHeight }}>
                <Flex className={overlayClass} clickFunction={handleClose} />
                <HStack className={modalContentClass}>
                    
                <VStack>
                    {typeof rest.children === 'object' && React.isValidElement(rest.children)
                        ? React.cloneElement(rest.children, { onClose: handleClose })
                        : rest.children}
                </VStack>

                </HStack>
                {rest.isOuterClose && (
                    <Icon
                        Svg={xIcon}
                        width={36}
                        height={36}
                        clickable
                        onClick={handleClose}
                        btnClassName='modal-x'
                    />
                )}
            </div>
        </VStack>
    )
}
