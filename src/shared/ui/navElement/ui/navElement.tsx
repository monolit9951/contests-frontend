import { NavLink } from 'react-router-dom'

import './navElement.scss'

interface NavElementProps {
    imgAlt: string | undefined
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