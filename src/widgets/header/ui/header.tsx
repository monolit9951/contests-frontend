import { Logo } from 'shared/ui/logo/ui/logo'
import { Searchbar } from 'shared/ui/Searchbar'
import { UserPanel } from 'shared/ui/UserPanel/ui/userPanel'

import './header.scss'

export const Header = () => {
    return (
        <nav className='header'>
            <h1>Logotype</h1>
            <div className='input-box'>
                <Input
                    type='search'
                    placeholder='Button books by title, author, ISBN or keywords'
                />
            </div>
        </nav>
    )
}
