import burger from "../../../assets/icons/burger.svg"

import "./burgerMenu.scss"

export const BurgerMenu = () => {
    return(
        <div className="burgerMenu">
            <img src={burger} alt="b" />
        </div>
    )
}