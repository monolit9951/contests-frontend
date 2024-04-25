import { BurgerMenu } from 'shared/ui/burgerMenu'
import { NavElement } from 'shared/ui/navElement'

import './sidebar.scss'

export const Sidebar = () => {
    const mockNavData = [
        {
            imgSrc: 'https://images.fineartamerica.com/images-medium-large-5/chetah-nian-chen.jpg',
            imgAlt: 'img1',
            text: 'Feed',
            route: '/feed',
        },
        {
            imgSrc: 'https://images.fineartamerica.com/images-medium-large-5/chetah-nian-chen.jpg',
            imgAlt: 'img2',
            text: 'Contests',
            route: '/contests',
        },
        {
            imgSrc: 'https://images.fineartamerica.com/images-medium-large-5/chetah-nian-chen.jpg',
            imgAlt: 'img3',
            text: 'Battles',
            route: '/battles',
        },
        {
            imgSrc: 'https://images.fineartamerica.com/images-medium-large-5/chetah-nian-chen.jpg',
            imgAlt: 'img4',
            text: 'Top users',
            route: '/topUsers',
        },
    ]

    return (
        <aside className='sidebar'>
            <BurgerMenu />
            <nav>
                {mockNavData.map((navItem) => (
                    <NavElement
                        key={navItem.route}
                        imgSrc={navItem.imgSrc}
                        imgAlt={navItem.imgAlt}
                        text={navItem.text}
                        route={navItem.route}
                    />
                    // <NavElement key={navItem.route} {...navItem} />
                ))}
            </nav>
        </aside>
    )
}
