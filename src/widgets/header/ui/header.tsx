import { Input } from 'shared/ui/input'

import './header.scss'

export const Header = () => {
    return (
        <nav className='header'>
            <h1>Logotype</h1>
            <div className='input-box'>
                <Input
                    placeholder='Button books by title, author, ISBN or keywords'
                    type='text'
                />
            </div>
        </nav>
    )
}
