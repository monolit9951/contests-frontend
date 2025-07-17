import { FC } from "react"
import MediaGalery from "widgets/mediaGalery"

import './exampleGaleryModal.scss'

interface Props {
    media: any
    type?: 'TYPED' | 'ARRAYOFLINKS'
    index?: number
}

const ExampleGaleryModal: FC<Props> = ({media, type = 'TYPED', index = 0}) => {

    return(
        <div className="exampleGaleryModal">
            <MediaGalery media={media} type={type} className="exampleGaleryModal_galery" index={index}/>
        </div>
    )
}

export default ExampleGaleryModal