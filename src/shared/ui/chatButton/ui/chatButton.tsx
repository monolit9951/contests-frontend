import chatF from 'shared/assets/icons/chatF.svg?react'
import { Icon } from 'shared/ui/icon'

import './chatButton.scss'

export const ChatButton = () => {
    return <Icon Svg={chatF} clickable />
}
