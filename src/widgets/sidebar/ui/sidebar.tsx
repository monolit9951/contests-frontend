import { BurgerMenu } from 'shared/ui/burgerMenu'
import { Navbar } from 'shared/ui/navBar/ui/navBar'

import './sidebar.scss'

export const Sidebar = () => {
    return (
        <aside className='sidebar'>
            <BurgerMenu />
            <Navbar />
        </aside>
    )
}
