import { Icon } from "shared/ui/Icon"

import burger from "../../../assets/icons/burger.svg?react"

import "./burgerMenu.scss"

export const BurgerMenu = () => {
    return(
        <div className="burgerMenu">
            <Icon Svg={burger} height={36} width={36}/>
        </div>
    )
}