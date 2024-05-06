import { Icon } from "shared/ui/Icon"

import magnifyingGlass from "../../../assets/icons/magnifyingGlass.svg?react"

import "./searchbar.scss"

export const Searchbar = () => {
    return (
        <div className="searchbar_container">
            <Icon Svg={magnifyingGlass} className="icon"/>
            <input className="searchbar" placeholder="Search by any parameters...."/>
        </div>
    )
} 