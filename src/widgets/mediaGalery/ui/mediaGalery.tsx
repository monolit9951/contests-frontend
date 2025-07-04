import { FC, useState } from "react";
import classNames from "classnames";
import { Video } from "shared/ui/videoPlayer";
import navLeft from 'shared/assets/icons/navLeft.svg'
import navRight from 'shared/assets/icons/navRight.svg'
import './mediaGalery.scss';
import GaleryNavButton from "./components/galeryNavButton/galeryNavButton";
import GaleryNavDots from "./components/galeryNavDots/galeryNavDots";

interface MediaInterface {
    id: string,
    contestId: string,
    mediaLink: string,
    status: string | null,
    typeMedia: string,
    userId: string
    workId: string
}

interface MediaGaleryInterface {
    media: MediaInterface[]
}

const MediaGalery: FC <MediaGaleryInterface> = ({media}) => {

    // const media = [
    //     { type: 'VIDEO', src: sampleVideo1 },
    //     { type: 'IMAGE', src: sampleImg1 },
    //     { type: 'IMAGE', src: sampleImg2 },
    //     { type: 'VIDEO', src: sampleVideo2 },
    //     { type: 'VIDEO', src: sampleVideo2 }
    // ];

    console.log("media : ", media)

    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState<'next' | 'prev'>('next');

    const handleNext = () => {
        setDirection('next');
        setCurrentIndex(prev => (prev < media.length - 1 ? prev + 1 : 0));
    };

    const handlePrev = () => {
        setDirection('prev');
        setCurrentIndex(prev => (prev > 0 ? prev - 1 : media.length - 1));
    };

    const currentMedia = media[currentIndex];

    return (
        <div className="mediaGalery">
            <div
                className={classNames("mediaGalery_media", {
                    slideInNext: direction === 'next',
                    slideInPrev: direction === 'prev',
                })}
                key={currentMedia.id}
            >
                {currentMedia.typeMedia === 'IMAGE' ? (
                    <img
                        src={currentMedia.mediaLink}
                        className="mediaGalery_media_image"
                        alt="workImg"
                    />
                ) : (
                    <Video url={currentMedia.mediaLink} />
                )}
            </div>

                <GaleryNavButton imgSrc={navLeft} handleFunc={handlePrev} classname="mediaGalery_navigationDataLeft"/>
                <GaleryNavButton imgSrc={navRight} handleFunc={handleNext} classname="mediaGalery_navigationDataRight"/>
                <GaleryNavDots classname="mediaGalery_navigationDataInfo" currentIndex={currentIndex} arrayLengh={media.length}/>
    </div>
    );
};

export default MediaGalery;
