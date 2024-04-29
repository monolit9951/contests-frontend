import { ChatButton } from 'shared/ui/chatButton'
import { CreateButton } from 'shared/ui/createButton/ui/createButton'
import { NotificationsButton } from 'shared/ui/notificationsButton/ui/notificationsButton'
import { UserIcon } from 'shared/ui/userIcon'

import './userPanel.scss'

export const UserPanel = () => {
    return (
        <div className='userPanel_container'>
            <CreateButton />
            <NotificationsButton/>
            <ChatButton/>
            <UserIcon/>
        </div>
    )
}
