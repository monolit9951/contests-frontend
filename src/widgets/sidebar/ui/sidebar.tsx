import { BurgerMenu } from 'shared/ui/burgerMenu'
import { Navbar } from 'shared/ui/navbar/ui/navbar'

import './sidebar.scss'

export const Sidebar = () => {
    return (
        <aside className='sidebar'>
            <BurgerMenu />
            <Navbar/>
        </aside>
    )
}
