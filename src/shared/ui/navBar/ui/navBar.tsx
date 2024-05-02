import { mockNavData } from 'app/api'
import { NavElement } from 'shared/ui/navElement'

import './navBar.scss'

export const Navbar = () => {
    return (
        <nav>
            {mockNavData.map((navItem) => (
                <NavElement
                    key={navItem.route}
                    text={navItem.text}
                    route={navItem.route}
                />
            ))}
        </nav>
    )
}
