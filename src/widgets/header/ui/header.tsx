import { Logo } from 'shared/ui/logo/'
import { Searchbar } from 'shared/ui/searchbar'
import { UserPanel } from 'widgets/userPanel'

import './header.scss'


export const Header = () => {
    return (
        <nav className="header">
            <Logo/>
            <Searchbar/>
            <UserPanel/>
        </nav>
    )
}
