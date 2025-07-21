// fix for sockjs in browser
// @ts-ignore
if (typeof global === 'undefined') window.global = window;

import bellF from 'shared/assets/icons/bellF.svg?react'
import { Icon } from 'shared/ui/icon'

import './notificationsButton.scss'
import { useEffect, useState } from 'react'
import SockJS from 'sockjs-client'
import { Client } from '@stomp/stompjs';


export const NotificationsButton = () => {

    // ТИПИЗАЦИЯ НОТИФИКАЦИИ, СДЕЛАТЬ ПОЗЖЕ
    const [notifications, setNotifications] = useState<any>([])

    // ENV
    const SOCKET_URL = 'http://localhost:8080/ws-sockjs';
        
    useEffect(() => {
        const socket = new SockJS(SOCKET_URL)
        const stompClient = new Client({
        webSocketFactory: () => socket,
        debug: () => {}, // отключим логи
        reconnectDelay: 5000,
        onConnect: () => {
            console.log('✅ Подключено к STOMP WebSocket');
            stompClient.subscribe('/topic/notifications', (message) => {
            if (message.body) {
                const data = JSON.parse(message.body);
                setNotifications((prev) => [...prev, data]);
            }
            });
        },
        onStompError: (frame) => {
            console.error('❌ STOMP ошибка:', frame);
        }
        });

        stompClient.activate();

        return () => {
        stompClient.deactivate();
        };
    }, []);


    // проверка на работу 
    useEffect(() => {
        console.log(notifications)
    }, [notifications])

    return (
        <div className="notification">
            <Icon clickable Svg={bellF} />

            <div className="notification_active">1</div>
        </div>
    )
}
