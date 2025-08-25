import { FC, useState } from "react";
import { Media } from "entities/work/model/types";
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

interface Prop {
    media: Media[];
    // type?: 'TYPED' | 'ARRAYOFLINKS'
    className?: string
    index?: number
}

const MediaGalery: FC<Prop> = ({ media, className, index = 0 }) => {
    const [currentIndex, setCurrentIndex] = useState(index);
    const [direction, setDirection] = useState<'next' | 'prev'>('next');

    const handleNext = () => {
        setDirection('next');
        setCurrentIndex(prev => (prev < media.length - 1 ? prev + 1 : 0));
    };

    const handlePrev = () => {
        setDirection('prev');
        setCurrentIndex(prev => (prev > 0 ? prev - 1 : media.length - 1));
    };

    const setMediaIndex = (idx: number) => {
        setCurrentIndex(idx);
    };

    const currentMedia = media[currentIndex];

    return (
        <div className={`mediaGalery ${className}`}>
            
            <div
                className={
                    `mediaGalery_media ${  direction === 'next' ? "slideInNext" : "slideInPrev"}`
                }
                key={currentMedia.id}
            >
                {currentMedia.typeMedia === 'VIDEO' ? (
                    <Video url={currentMedia.mediaLink} />
                ) : (
                    <img
                        src={currentMedia.mediaLink}
                        className="mediaGalery_media_image"
                        alt="workImg"
                    />
                )}
            </div>

            {media.length !== 1 && 
            <>
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
            </>}

        </div>
    );
};

export default MediaGalery;
