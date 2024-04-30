import { NavLink } from 'react-router-dom'

import './navElement.scss'

interface NavElementProps {
    imgSrc: string
    imgAlt: string
    text: string
    route: string
}

export const NavElement = ({ imgSrc, imgAlt, text, route }: NavElementProps) => {
    return (
            <NavLink to={route} className='navElement'>
                <img src={imgSrc} alt={imgAlt} />
                <p>{text}</p>
            </NavLink>
    )
}