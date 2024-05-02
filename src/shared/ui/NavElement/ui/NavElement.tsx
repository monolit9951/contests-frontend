import { NavLink } from 'react-router-dom'

import './NavElement.scss'

interface NavElementProps {
    text: string
    route: string
}

export const NavElement = ({ text, route }: NavElementProps) => {
    return (
        <NavLink to={route} className='navElement'>
            <p>{text}</p>
        </NavLink>
    )
}
