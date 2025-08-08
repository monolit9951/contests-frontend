import { FC } from "react"
import MediaGalery from "widgets/mediaGalery"

import './exampleGaleryModal.scss'

interface Props {
    media: any
    // type?: 'TYPED' | 'ARRAYOFLINKS'
    index?: number
}

const ExampleGaleryModal: FC<Props> = ({
    media, 
    // type = 'TYPED', 
    index = 0}) => {

    return(
        <div className="exampleGaleryModal">
            <MediaGalery 
            media={media} 
            className="exampleGaleryModal_galery" 
            // type = "TYPED"
            index={index}/>
        </div>
    )
}

export default ExampleGaleryModal