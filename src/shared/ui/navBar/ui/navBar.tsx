import { mockNavData } from 'app/api'
import { NavElement } from 'shared/ui/navElement'

import './navBar.scss'

export const Navbar = () => {
    return (
        <nav>
            {mockNavData.map((navItem, index) => (
                <NavElement key={index} {...navItem} />
            ))}
        </nav>
    )
}
