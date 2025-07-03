import { FC, useState } from "react";
import classNames from "classnames";
import { Video } from "shared/ui/videoPlayer";

import './mediaGalery.scss';

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

            <button type="button" className="mediaGalery_navigationButton" onClick={handlePrev}>{"<"}</button>
            <span className="mediaGalery_navigationData">{currentIndex + 1} / {media.length}</span>
            <button type="button" className="mediaGalery_navigationButton" onClick={handleNext}>{">"}</button>
    </div>
    );
};

export default MediaGalery;
