import { FC, useEffect, useRef,useState } from "react";
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
    
    const touchStartX = useRef<number>(0);
    const touchEndX = useRef<number>(0);
    const mediaContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = () => setIsMobile(window.innerWidth < 700);
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, []);

    // Функции для обработки свайпов
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleNext = () => {
        setDirection('next');
        setCurrentIndex(prev => (prev < media.length - 1 ? prev + 1 : 0));
    };

    const handlePrev = () => {
        setDirection('prev');
        setCurrentIndex(prev => (prev > 0 ? prev - 1 : media.length - 1));
    };


    const handleTouchEnd = () => {
        if (!touchStartX.current || !touchEndX.current) return;

        const diffX = touchStartX.current - touchEndX.current;
        const minSwipeDistance = 50;

        if (Math.abs(diffX) > minSwipeDistance) {
            if (diffX > 0) {
                handleNext();
            } else {
                handlePrev();
            }
        }

        // Сброс 
        touchStartX.current = 0;
        touchEndX.current = 0;
    };

    const setMediaIndex = (idx: number) => {
        setDirection(idx > currentIndex ? 'next' : 'prev');
        setCurrentIndex(idx);
    };

    const currentMedia = media[currentIndex];

    return (
        <div className={`mediaGalery ${className}`}>
            
            <div
                ref={mediaContainerRef}
                className={`mediaGalery_media ${direction === 'next' ? "slideInNext" : "slideInPrev"}`}
                key={currentMedia.id}
                {...(isMobile && {
                    onTouchStart: handleTouchStart,
                    onTouchMove: handleTouchMove,
                    onTouchEnd: handleTouchEnd
                })}
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