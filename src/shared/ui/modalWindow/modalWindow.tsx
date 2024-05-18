import { ReactNode } from 'react'
import ReactModal from 'react-modal'
import clsx from 'clsx'

import './modalWindow.scss'

interface IModalWindow {
    isOpen: boolean
    children: ReactNode
    className?: string
    overlayClassName?: string
}

export default function ModalWindow(props: IModalWindow) {
    const { isOpen, children, className, overlayClassName } = props

    return (
        <ReactModal
            isOpen={isOpen}
            className={clsx('modal', className)}
            overlayClassName={clsx('overlay', overlayClassName)}>
            {children}
        </ReactModal>
    )
}
