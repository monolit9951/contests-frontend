import { NavLink } from 'react-router-dom'
import plus from 'shared/assets/icons/plus.svg?react'
import { Icon } from 'shared/ui/icon'
import { Text } from 'shared/ui/text'

import './createButton.scss'

export const CreateButton = () => {
    return (
        <NavLink to='/contestsCreate' className='createBtn'>
            <Icon Svg={plus} />
            <Text Tag='p'>Create</Text>
        </NavLink>
    )
}
