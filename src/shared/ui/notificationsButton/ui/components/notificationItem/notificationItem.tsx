import { FC } from "react"
import { Notification } from "entities/notification"
import statusRead from 'shared/assets/icons/statusRead.svg'
import statusUnread from 'shared/assets/icons/statusUnread.svg'

import './notificationItem.scss'

interface Props{
    notification: Notification
}

const NotificationItem: FC<Props> = ({notification}) => {
    // время в UTC 


    return(
        <li className={`notificationItem ${!notification.read && 'unread'}`} >
            
            <div className='notificationItem_content'>
                <div className="notificationItem_image">d</div>
                <div className="notificationItem_text">{notification.content}</div>
            </div>

            <div className="notificationItem_additional">
                <div className="notificationItem_time">{notification.createdAt}</div>
                <img src={notification.read? statusRead : statusUnread} alt="status" />
            </div>
        </li>
    )
}

export default NotificationItem