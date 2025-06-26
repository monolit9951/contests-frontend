import burger from 'shared/assets/icons/burger.svg?react'
import { ChatButton } from 'shared/ui/chatButton'
import { CreateButton } from 'shared/ui/createButton/ui/createButton'
import { Icon } from 'shared/ui/icon'
import { NotificationsButton } from 'shared/ui/notificationsButton/ui/notificationsButton'
import { UserIcon } from 'shared/ui/userIcon'

import './userPanel.scss'
import { Link } from 'react-router-dom'

export const UserPanel = () => {
    return (
        <div className='userPanel_container'>
            <CreateButton />
            <NotificationsButton/>
            <ChatButton/>
            <Link to='/profile'>
                <UserIcon/>
            </Link>
            
            <div className="userPanel_burger">
                <Icon
                    Svg={burger}
                    height={36}
                    width={36}
                    clickable
                />
            </div>
        </div>
    )
}
