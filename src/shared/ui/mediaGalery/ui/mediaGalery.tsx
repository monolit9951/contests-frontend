import { FC } from "react";
import './mediaGalery.scss'
import { Work } from "entities/work";
import { Media } from "entities/work/model/types";

// пока это просто галерея для мобильной версии

interface Props{
    media: Media[]
}

const MediaGalery: FC<Props> = ({media}) => {
    return(
        <div className="mediaGalery">
            dada
        </div>
    )
}

export default MediaGalery