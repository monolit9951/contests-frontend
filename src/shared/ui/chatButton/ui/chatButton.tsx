import { Icon } from 'shared/ui/Icon'

import chatF from '../../../assets/icons/chatF.svg?react'

import './chatButton.scss'

export const ChatButton = () => {
    return (
        <div>
            <Icon Svg={chatF} />
        </div>
    )
}
