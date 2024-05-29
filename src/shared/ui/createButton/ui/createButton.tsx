import { NavLink } from "react-router-dom"
import { Icon } from "shared/ui/icon"
import { Text } from "shared/ui/text"

import plus from "../../../assets/icons/plus.svg?react"

import './createButton.scss'

export const CreateButton = () => {
    return (
            <NavLink to="/contestsCreate" className='createBtn'>
                <Icon className="icon" Svg={plus} />
                <Text Tag="p">Create</Text>
            </NavLink>
    )
}
