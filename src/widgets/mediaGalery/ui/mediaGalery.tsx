import { FC, useEffect, useState } from "react";
import { Media } from "entities/work/model/types";
import navLeft from 'shared/assets/icons/navLeft.svg';
import navRight from 'shared/assets/icons/navRight.svg';
import { CustomVideoPlayer } from "shared/ui/customVideoPlayer";

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
    className?: string;
    index?: number;
}

const MediaGalery: FC<Prop> = ({ media, className, index = 0 }) => {
    const [currentIndex, setCurrentIndex] = useState(index);
    const [direction, setDirection] = useState<'next' | 'prev'>('next');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    useEffect(() => {
        const handler = () => setIsMobile(window.innerWidth < 700);
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);
    const handleNext = () => {
        setDirection('next');
        setCurrentIndex(prev => (prev < media.length - 1 ? prev + 1 : 0));
    };

    const handlePrev = () => {
        setDirection('prev');
        setCurrentIndex(prev => (prev > 0 ? prev - 1 : media.length - 1));
    };

    const setMediaIndex = (idx: number) => {
        setDirection(idx > currentIndex ? 'next' : 'prev');
        setCurrentIndex(idx);
    };

    const currentMedia = media[currentIndex];

    return (
        <div className={`mediaGalery ${className}`}>
            
            <div
                className={`mediaGalery_media ${direction === 'next' ? "slideInNext" : "slideInPrev"}`}
                key={currentMedia.id}
            >
                {currentMedia.typeMedia === 'VIDEO' ? (
                    <CustomVideoPlayer 
                        src={currentMedia.mediaLink}
                    />
                ) : (
                    <img
                        src={currentMedia.mediaLink}
                        className="mediaGalery_media_image"
                        alt="workImg"
                        key={currentMedia.id}
                    />
                )}
            </div>

            {media.length !== 1 && 
            <>
                {!isMobile && <GaleryNavButton
                    imgSrc={navLeft}
                    handleFunc={handlePrev}
                    classname="mediaGalery_navigationDataLeft"
                />}
                {!isMobile && <GaleryNavButton
                    imgSrc={navRight}
                    handleFunc={handleNext}
                    classname="mediaGalery_navigationDataRight"
                />}
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