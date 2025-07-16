import React, { Children, FC, ReactNode, useEffect, useState } from 'react'
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


    const handleClose = () =>{
        if(rest.onClose){
            rest.onClose()
        }
    }

    return (
        <div className="modalWindow">
            <div className="modalWindow_background" onClick={handleClose}/>

            <div className="modalWindow_overlay">
                {rest.children}
            </div>
        </div>
    )
}
