import { FC } from "react";
import './galeryNavButton.scss'

interface GaleryNavButtonInterface {
    handleFunc: () => void,
    imgSrc: string,
    classname?: string
}

const GaleryNavButton: FC <GaleryNavButtonInterface> = ({handleFunc, imgSrc, classname}) => {
    return(
        <button type="button" className={classname? `galeryButton ${classname}` : "galeryButton"} onClick={handleFunc}>
            <img src={imgSrc} alt="nav" />
        </button>
    )
}

export default GaleryNavButton