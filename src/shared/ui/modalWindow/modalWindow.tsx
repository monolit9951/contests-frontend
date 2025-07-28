import { cloneElement, FC, isValidElement, ReactNode, useEffect } from 'react'

// import clsx from 'clsx'
// import { useTheme } from 'entities/theme'
// import xIcon from 'shared/assets/icons/Secondary_btn.svg?react'
// import { Icon } from 'shared/ui/icon'
// import { Flex, HStack, VStack } from 'shared/ui/stack'
import './modalWindow.scss'

interface Props {
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

export const ModalWindow: FC<Props> = ({
    ...rest
}) => {
    
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
        const clonedChildren = isValidElement(rest.children) ? cloneElement(rest.children, { onClose: rest.onClose }) : rest.children

    return (
        <div className="modalWindow">
            <div className={`modalWindow_background ${rest.className}`} onClick={handleClose}/>

            <div className="modalWindow_overlay">
                {clonedChildren}
            </div>
        </div>
    )
}
