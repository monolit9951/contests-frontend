import { mockNavData } from 'app/api'
import { NavElement } from 'shared/ui/navElement'

import './navbar.scss'

export const Navbar = () => {
    return (
        <nav>
            {mockNavData.map((navItem) => (
                <NavElement
                    key={navItem.route}
                    imgAlt={navItem.imgAlt}
                    text={navItem.text}
                    route={navItem.route}
                />
            ))}
        </nav>
    )
}
