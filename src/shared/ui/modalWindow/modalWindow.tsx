import { cloneElement, FC, isValidElement, ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { lockScroll, unlockScroll } from 'shared/helpers'

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
  portal?: boolean
}

export const ModalWindow: FC<Props> = ({ portal= false, ...rest }) => {
  useEffect(() => {
    if (rest.isOpen) {
      lockScroll()
    }
    return () => {
      if (rest.isOpen) {
        unlockScroll()
      }
    }
  }, [rest.isOpen])

  if (!rest.isOpen) return null

  const handleClose = () => {
    rest.onClose?.()
  }

  const clonedChildren = isValidElement(rest.children)
    ? cloneElement(rest.children)
    : rest.children

  const modal = (
    <div className="modalWindow">
      <button
        type="button"
        aria-label="Close modal"
        className={`modalWindow_background ${rest.className ?? ''}`}
        onClick={handleClose}
      />

      <div className="modalWindow_overlay">
        {clonedChildren}
      </div>
    </div>
    )

    // если нужно показать модалку прямо в body
    // делал чтоб избежать наложения, при использовании
    // на другие модалки может сбросить их стили
    if(portal){
        return createPortal(modal, document.body)
    } 

    return modal
}
