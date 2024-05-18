import { Icon } from "shared/ui/icon"

import magnifyingGlass from "../../../assets/icons/magnifyingGlass.svg?react"

import "./searchbar.scss"

interface SearchbarProps{
    placeholder: string
}

export const Searchbar = ({placeholder}: SearchbarProps) => {
    return (
        <div className="searchbar_container">
            <Icon Svg={magnifyingGlass} className="icon"/>
            <input className="searchbar" placeholder={placeholder}/>
        </div>
    )
} 