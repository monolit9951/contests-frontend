import { FC } from "react"
import MediaGalery from "widgets/mediaGalery"
import './exampleGaleryModal.scss'

interface Props {
    media: any
    type?: 'TYPED' | 'ARRAYOFLINKS'
}

const ExampleGaleryModal: FC<Props> = ({media, type = 'TYPED'}) => {

    console.log

    return(
        <div className="exampleGaleryModal">
            <MediaGalery media={media} type={type} className="exampleGaleryModal_galery"/>
        </div>
    )
}

export default ExampleGaleryModal