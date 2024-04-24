import { Input } from 'shared/ui/input'

import './header.scss'

export const Header = () => {

    return (
        <nav className="header">
            <h1>Logotype</h1>
            <div className="input-box">
                <Input
                    placeholder='Input books by title, author, ISBN or keywords'
                />
            </div>
        </nav>
    )
}
