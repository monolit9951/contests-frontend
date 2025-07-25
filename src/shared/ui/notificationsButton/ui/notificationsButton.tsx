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
import { useGetRequest } from 'shared/lib/hooks/useGetRequest';
import { fetchAllContests } from '../model/services/notificationService';
import { Notification } from 'entities/notification';


export const NotificationsButton = () => {

    // ТИПИЗАЦИЯ НОТИФИКАЦИИ, СДЕЛАТЬ ПОЗЖЕ
    const [notifications, setNotifications] = useState<Notification[]>([])

    const {data: notifData, isLoaded: notifDataLoaded} = useGetRequest<Notification[] | string>({fetchFunc: () => fetchAllContests(), key: [], enabled: true})

    const token = localStorage.getItem('userToken')

    // ENV
    const SOCKET_URL = `http://localhost:8080/ws-sockjs?token=${token}`;
    
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
            stompClient.subscribe('/user/queue/notifications', (message) => {
            if (message.body) {
                const data = JSON.parse(message.body)
                setNotifications((prev) => [data, ...prev])

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

        if(notifDataLoaded){
            console.log(notifications)  
            setUnread(notifData.content.some(item => item.read === false))
        }

    }, [notifications, notifData, notifDataLoaded])

    useEffect(() => {
        if(notifDataLoaded){
            setNotifications(notifData.content)
        }
    }, [notifDataLoaded])


    const handleISawNotification = async(id: string) => {
        // await instance.post('')
        console.log(`read notification ${id}`)
    }

    console.log(notifications)
    console.log(notifData)
    

    // дизайн переделать
    return (
        <div className="notification">
            <Icon clickable Svg={bellF} onClick={handleDropDown}/>

            {unread && <div className="notification_active">{' '}</div>}

            {notifDataLoaded && dropList && (notifications.length > 0? <ul className="notification_list">
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
