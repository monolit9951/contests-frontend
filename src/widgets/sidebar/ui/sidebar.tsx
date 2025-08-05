import { useState } from 'react'
import { mockNavData } from 'app/api'
import clsx from 'clsx'
// import burger from 'shared/assets/icons/burger.svg?react'
// import { Icon } from 'shared/ui/icon'
import { NavElement } from 'shared/ui/navElement'

import './sidebar.scss'

export const Sidebar = () => {
    const [open] = useState(true)

    // const toggleSidebar = () => {
    //     setOpen(!open)
    // }

    return (
        <aside className={clsx('sidebar', open && 'open')}>
            {/* <div className='burgerMenu'>
                <Icon
                    Svg={burger}
                    height={36}
                    width={36}
                    clickable
                    onClick={toggleSidebar}
                />
            </div> */}
            <nav>
                {mockNavData.map((navItem, index) => (
                    <NavElement key={index} {...navItem} />
                ))}
            </nav>
        </aside>
    )
}
