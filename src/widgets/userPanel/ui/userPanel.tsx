import { useEffect,useState } from 'react';
import { ChatButton } from 'shared/ui/chatButton'
import { CreateButton } from 'shared/ui/createButton/ui/createButton'
import { NotificationsButton } from 'shared/ui/notificationsButton/ui/notificationsButton'
import { UserIcon } from 'shared/ui/userIcon'

import './userPanel.scss'

export const UserPanel = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    if (isMobile) {
        return (
            <div className='userPanel_container'>
                <UserIcon />
            </div>
        );
    }

    return (
        <div className='userPanel_container'>
            <CreateButton />
            <NotificationsButton />
            <ChatButton />
            <UserIcon />
        </div>
    );
};

