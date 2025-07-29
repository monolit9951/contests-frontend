import { FC, useState } from "react"
import './notificationItem.scss'
import { Notification } from "entities/notification"
import statusRead from 'shared/assets/icons/statusRead.svg'
import statusUnread from 'shared/assets/icons/statusUnread.svg'

interface Props{
    notification: Notification
}

const NotificationItem: FC<Props> = ({notification}) => {
    // время в UTC 
    console.log(notification)
    const [notifRead, setNorifRead] = useState<boolean>(notification.read)

    const handleRead = async() => {
        setNorifRead(true)
    }

    return(
        <li className={`notificationItem ${!notifRead && 'unread'}`} onClick={handleRead}>
            
            <div className='notificationItem_content'>
                <div className="notificationItem_image">d</div>
                <div className="notificationItem_text">{notification.content}</div>
            </div>

            <div className="notificationItem_additional">
                <div className="notificationItem_time">{notification.createdAt}</div>
                <img src={notifRead? statusRead : statusUnread} alt="status" />
            </div>
        </li>
    )
}

export default NotificationItem