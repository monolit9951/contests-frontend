import { BurgerMenu } from 'shared/ui/BurgerMenu'
import { Navbar } from 'shared/ui/NavBar/ui/NavBar'

import './sidebar.scss'

export const Sidebar = () => {
    return (
        <aside className='sidebar'>
            <BurgerMenu />
            <Navbar />
        </aside>
    )
}
