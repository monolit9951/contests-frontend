import clsx from "clsx";
import {useTheme} from "entities/theme";
import { Icon } from "shared/ui/icon"

import magnifyingGlass from "../../../assets/icons/magnifyingGlass.svg?react"

import "./searchbar.scss"

interface SearchbarProps{
    placeholder: string
}

export const Searchbar = ({placeholder}: SearchbarProps) => {
    const {theme} = useTheme()
    return (
        <div className={clsx("searchbar_container", theme)}>
            <Icon Svg={magnifyingGlass} className="icon"/>
            <input className="searchbar" placeholder={placeholder}/>
        </div>
    )
} 