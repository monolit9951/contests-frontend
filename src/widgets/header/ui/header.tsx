import { Logo } from 'shared/ui/logo/'
import { Searchbar } from 'shared/ui/searchbar'
import { UserPanel } from 'widgets/userPanel'

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
        <nav className="header">
            <Logo/>
            <Searchbar/>
            <UserPanel/>
        </nav>
    )
}
