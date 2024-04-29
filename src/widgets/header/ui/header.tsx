import { Input } from 'shared/ui/input'

import './header.scss'
import { Searchbar } from 'shared/ui/Searchbar'
import { UserPanel } from 'shared/ui/UserPanel/ui/userPanel'
import { Logo } from 'shared/ui/logo/ui/logo'

export const Header = () => {

    return (
        <nav className="header">
            <Logo/>
            <Searchbar/>
            <UserPanel/>
        </nav>
    )
}
