// fix for sockjs in browser
// @ts-ignore
import { useEffect, useState } from 'react'
import { Client } from '@stomp/stompjs';
import { Notification } from 'entities/notification';
import { PagedRequest } from 'entities/request/intex';
import instance from 'shared/api/api';
import bellF from 'shared/assets/icons/bellF.svg?react'
import cross from 'shared/assets/icons/X.svg'
import { useGetRequest } from 'shared/lib/hooks/useGetRequest';
import { Icon } from 'shared/ui/icon'
import SockJS from 'sockjs-client'

import { fetchAllNotifications } from '../model/services/notificationService';

import NotificationItem from './components/notificationItem/notificationItem';

import './notificationsButton.scss'

// if (typeof global === 'undefined') window.global = window;


export const NotificationsButton = () => {

    // ТИПИЗАЦИЯ НОТИФИКАЦИИ, СДЕЛАТЬ ПОЗЖЕ
    const [notifications, setNotifications] = useState<Notification[]>([])

    const {data: notifData, isLoaded: notifDataLoaded} = useGetRequest<PagedRequest<Notification> | string>({fetchFunc: () => fetchAllNotifications(), key: [], enabled: true})

    const token = localStorage.getItem('userToken')

    // ENV
    const SOCKET_URL = `https://darebay.com/ws-sockjs?token=${token}`;
    
    // дропдаун лист для уведомлений
    const [dropList, setDropList] = useState<boolean>(false)
    const [unread, setUnread] = useState<boolean>(false)

    const handleDropDown = () => {
        setDropList(!dropList)
    }

    // получение по сокету, сразу добавляем непрочитанный статус
    useEffect(() => {
        const socket = new SockJS(SOCKET_URL)
        const stompClient = new Client({
        webSocketFactory: () => socket,
        debug: () => {}, // отключим логи
        reconnectDelay: 5000,
        onConnect: () => {
            stompClient.subscribe('/user/queue/notifications', (message) => {
            if (message.body) {
                const data = JSON.parse(message.body)
                setNotifications((prev) => [data, ...prev])
                setUnread(true)
            }
            })
        },
        // onStompError: (frame) => {
        //     console.error('❌ STOMP ошибка:', frame)
        // }
        });

        stompClient.activate()

        return () => {
            stompClient.deactivate()
        };
    }, []);

    // при первом рендере сразу проверяем есть ли непрочитанные
    useEffect(() => {
    if (notifDataLoaded && notifData && typeof notifData !== 'string') {
        setNotifications(notifData.content)
        setUnread(notifData.content.some(item => !item.read))
    }
    }, [notifDataLoaded, notifData])

    
    // прочитать все
    const handleReadAll = async() => {
        try{
            await instance.post('notifications/read-all', {}, {headers:{ Authorization: `Bearer ${token}`}})

            setNotifications(prev =>
                prev.map(notification => ({
                    ...notification,
                    read: true
                }))
            );

            setUnread(false)

        } catch (error){
            // console.log(error)
        }
    }

    // прочитать все спустя 5 секунд после открытия
    useEffect(() =>{
        if(dropList === true){
            setTimeout(() => {
                handleReadAll()
            }, 5000);
        }
    }, [dropList])



    return (
        <div className="notification">
            <Icon clickable Svg={bellF} onClick={handleDropDown}/>

            {unread && <div className="notification_active">{' '}</div>}

            {notifDataLoaded && dropList && notifications &&
                <div className="notification_list">
                    <div className="notification_list_header">
                        <div className="notification_list_heading">Notifications</div>
                        <button className="notification_list_cross" type='button' onClick={() => {setDropList(false)}}>
                            <img src={cross} alt="cross" />
                        </button>
                    </div>

                    {notifications.length > 0? <ul>
                        {notifications.slice(0, 3).map((data: Notification, index: number) => (
                            <NotificationItem key={index} notification={data}/>
                        ))}
                    </ul>
                    :
                    <div className="notification_list_empty">No notifications</div>
                    }


                    <div className="notification_list_readAll">
                        <button type='button' onClick={handleReadAll}>Mark all as read</button>
                        {/* <Button  variant = 'primary' type='button' onClick={handleReadAll}>MARK ALL AS READ</Button> */}
                    </div>
                </div>
            }

            {dropList && <button className="notification_list_onBlur" type='button' aria-label='close Notifications' onClick={() => {setDropList(false)}}> </button>}
        </div>
    )
}
