import { NavElement } from 'shared/ui/navElement'

import crown from "../../../assets/icons/crownSimple.svg"
import house from "../../../assets/icons/house.svg"
import sword from "../../../assets/icons/sword.svg"
import trophy from "../../../assets/icons/trophy.svg"

import './navbar.scss'

export const Navbar = () => {
    const mockNavData = [
        {
            imgSrc: house,
            imgAlt: 'house',
            text: 'Feed',
            route: '/feed',
        },
        {
            imgSrc: trophy,
            imgAlt: 'trophy',
            text: 'Contests',
            route: '/contests',
        },
        {
            imgSrc: sword,
            imgAlt: 'sword',
            text: 'Battles',
            route: '/battles',
        },
        {
            imgSrc: crown,
            imgAlt: 'crown',
            text: 'Top users',
            route: '/topUsers',
        },
    ]
    return (
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
    )
}
