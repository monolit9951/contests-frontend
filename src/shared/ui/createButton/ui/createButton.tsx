import { Icon } from "shared/ui/icon"

import plus from "../../../assets/icons/plus.svg?react"

import './createButton.scss'

export const CreateButton = () => {
    return (
        <button type="button" className='createBtn'>
                <Icon Svg={plus} />
                <p>Create</p>
        </button>
    )
}
