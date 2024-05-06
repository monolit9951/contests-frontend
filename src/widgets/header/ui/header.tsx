import { Logo } from 'shared/ui/logo/ui/logo'
import { Searchbar } from 'shared/ui/Searchbar'
import { UserPanel } from 'shared/ui/UserPanel/ui/userPanel'

import './header.scss'

export const Header = () => {
    return (
        <nav className='header'>
            <Logo />
            <Searchbar />
            <UserPanel />
        </nav>
    )
}
