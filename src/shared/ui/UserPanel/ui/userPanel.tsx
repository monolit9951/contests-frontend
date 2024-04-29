import { CreateButton } from 'shared/ui/createButton/ui/createButton'
import './userPanel.scss'
import { ChatButton } from 'shared/ui/chatButton'
import { NotificationsButton } from 'shared/ui/notificationsButton/ui/notificationsButton'
import { UserIcon } from 'shared/ui/userIcon'

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
