import { FC } from "react";

import './galeryNavDots.scss'

interface GaleryNavButtonInterface {
    classname?: string
    arrayLengh: number
    currentIndex: number
    setMediaIndex: (idx: number) => void 
}

const GaleryNavDots: FC <GaleryNavButtonInterface>= ({classname, arrayLengh, currentIndex, setMediaIndex}) => {

    return(
        <div className={classname? `galeryNavDots ${classname}` : "galeryNavDots"}>
            {Array.from({ length: arrayLengh }).map((_, index: number) => (
                <button type="button" onClick={() => setMediaIndex(index)} className={currentIndex === index? "galeryNavDots_dot active" : "galeryNavDots_dot"} key={index} aria-label="go to item" />
            ))}
        </div>
    )
}

export default GaleryNavDots