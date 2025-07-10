import { FC, useState } from "react";
import navLeft from 'shared/assets/icons/navLeft.svg';
import navRight from 'shared/assets/icons/navRight.svg';
import { Video } from "shared/ui/videoPlayer";

import GaleryNavButton from "./components/galeryNavButton/galeryNavButton";
import GaleryNavDots from "./components/galeryNavDots/galeryNavDots";

import './mediaGalery.scss';

export interface MediaInterface {
    id: string;
    contestId: string;
    mediaLink: string;
    status: string | null;
    typeMedia: string;
    userId: string;
    workId: string;
}

interface MediaGaleryInterface {
    media: MediaInterface[];
    type?: 'TYPED' | 'ARRAYOFLINKS'
}

const MediaGalery: FC<MediaGaleryInterface> = ({ media, type = 'TYPED' }) => {
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

    const setMediaIndex = (index: number) => {
        setCurrentIndex(index);
    };

    const currentMedia = media[currentIndex];

    return (
        <div className="mediaGalery">
            <div
                className={
                    `mediaGalery_media ${  direction === 'next' ? "slideInNext" : "slideInPrev"}`
                }
                key={currentMedia.id}
            >
                {currentMedia.typeMedia === 'IMAGE' ? (
                    <Video url={currentMedia.mediaLink} />
                ) : (
                    <img
                        src={type === 'TYPED'? currentMedia.mediaLink : currentMedia}
                        className="mediaGalery_media_image"
                        alt="workImg"
                    />
                )}
            </div>

            <GaleryNavButton
                imgSrc={navLeft}
                handleFunc={handlePrev}
                classname="mediaGalery_navigationDataLeft"
            />
            <GaleryNavButton
                imgSrc={navRight}
                handleFunc={handleNext}
                classname="mediaGalery_navigationDataRight"
            />
            <GaleryNavDots
                classname="mediaGalery_navigationDataInfo"
                setMediaIndex={setMediaIndex}
                currentIndex={currentIndex}
                arrayLengh={media.length}
            />
        </div>
    );
};

export default MediaGalery;
