import { FC } from "react";
import './galeryNavDots.scss'

const MockData = [
    {}, {}, {}
]

interface GaleryNavButtonInterface {
    classname?: string
    arrayLengh?: number
    currentIndex?: number
}

const GaleryNavDots: FC <GaleryNavButtonInterface>= ({classname, arrayLengh = 8, currentIndex = 3}) => {
    return(
        <div className={classname? `galeryNavDots ${classname}` : "galeryNavDots"}>
            {Array.from({ length: arrayLengh }).map((_, index: number) => (
                <div className={currentIndex === index? "galeryNavDots_dot active" : "galeryNavDots_dot"} key={index} />
            ))}
        </div>
    )
}

export default GaleryNavDots