// fix for sockjs in browser
// @ts-ignore
if (typeof global === 'undefined') window.global = window;

import bellF from 'shared/assets/icons/bellF.svg?react'
import { Icon } from 'shared/ui/icon'

import './notificationsButton.scss'
import { useEffect, useState } from 'react'
import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs';
import instance from 'shared/api/api';


export const NotificationsButton = () => {

    // ТИПИЗАЦИЯ НОТИФИКАЦИИ, СДЕЛАТЬ ПОЗЖЕ
    const [notifications, setNotifications] = useState<any>([])

    // ENV
    const SOCKET_URL = 'http://localhost:8080/ws-sockjs';
        
    // дропдаун лист для уведомлений
    const [dropList, setDropList] = useState<boolean>(false)
    const [unread, setUnread] = useState<boolean>(false)

    const handleDropDown = () => {
        setDropList(!dropList)
    }

    useEffect(() => {
        const socket = new SockJS(SOCKET_URL)
        const stompClient = new Client({
        webSocketFactory: () => socket,
        debug: () => {}, // отключим логи
        reconnectDelay: 5000,
        onConnect: () => {
            stompClient.subscribe('/topic/notifications', (message) => {
            if (message.body) {
                const data = JSON.parse(message.body)
                setNotifications((prev) => [...prev, data])
            }
            })
        },
        onStompError: (frame) => {
            console.error('❌ STOMP ошибка:', frame)
        }
        });

        stompClient.activate()

        return () => {
            stompClient.deactivate()
        };
    }, []);


    // проверка на работу 
    useEffect(() => {
        console.log(notifications)
        setUnread(notifications.some(item => item.read === false))
    }, [notifications])


    const handleISawNotification = async(id: string) => {
        // await instance.post('')
        console.log(`read notification ${id}`)
    }

    // дизайн переделать
    return (
        <div className="notification">
            <Icon clickable Svg={bellF} onClick={handleDropDown}/>

            {unread && <div className="notification_active">{' '}</div>}

            {dropList && (notifications.length > 0? <ul className="notification_list">
                {notifications.map((data: any, index: number) => (
                    <li key={index}><button type='button' onClick={() => handleISawNotification(data.id)}>{data.content}</button></li>
                ))}
            </ul>
            :
            <div className='notification_list_empty'>No notifications</div>
            )}
        </div>
    )
}
