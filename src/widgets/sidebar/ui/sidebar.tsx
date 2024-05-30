import { BurgerMenu } from 'shared/ui/burgerMenu'
import { Navbar } from 'widgets/navBar/ui/navBar'

import './sidebar.scss'

export const Sidebar = () => {
    return (
        <aside className='sidebar'>
            <BurgerMenu />
            <Navbar />
        </aside>
    )
}
