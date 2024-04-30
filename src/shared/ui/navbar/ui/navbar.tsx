import { mockNavData } from 'app/api'
import { NavElement } from 'shared/ui/navElement'

import './navbar.scss'

export const Navbar = () => {
    return (
        <nav>
            {mockNavData.map((navItem) => (
                <NavElement
                    key={navItem.route}
                    svgSrc={navItem.svgSrc}
                    svgFilledSrc={navItem.svgFilledSrc}
                    text={navItem.text}
                    route={navItem.route}
                />
            ))}

        </nav>
    )
}
