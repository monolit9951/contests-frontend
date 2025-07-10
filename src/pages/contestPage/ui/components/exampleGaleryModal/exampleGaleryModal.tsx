import { FC } from "react"
import MediaGalery from "widgets/mediaGalery"
import './exampleGaleryModal.scss'

interface Props {
    media: any
}

const ExampleGaleryModal: FC<Props> = ({media}) => {

    console.log(media)
    return(
        <div className="exampleGaleryModal">
            <MediaGalery media={media} type="ARRAYOFLINKS"/>
        </div>
    )
}

export default ExampleGaleryModal