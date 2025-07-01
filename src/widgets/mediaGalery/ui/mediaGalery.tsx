import { FC, useState } from "react";
import './mediaGalery.scss';
import sampleVideo1 from 'shared/assets/testVideos/testVideo.mp4';
import sampleVideo2 from 'shared/assets/testVideos/wideVideo.mp4';
import sampleImg1 from 'shared/assets/testImages/sampleWorkImage.png';
import sampleImg2 from 'shared/assets/testImages/workImgSample2.jpg';
import { Video } from "shared/ui/videoPlayer";

const MediaGalery: FC = () => {
    const media = [
        { type: 'VIDEO', src: sampleVideo1 },
        { type: 'IMAGE', src: sampleImg1 },
        { type: 'IMAGE', src: sampleImg2 },
        { type: 'VIDEO', src: sampleVideo2 },
        { type: 'VIDEO', src: sampleVideo2 }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex(prev => (prev < media.length - 1 ? prev + 1 : 0));
    };

    const handlePrev = () => {
        setCurrentIndex(prev => (prev > 0 ? prev - 1 : media.length - 1));
    };

    const currentMedia = media[currentIndex];

    return (
        <div className="mediaGalery">
            <div className="mediaGalery_media" key={currentMedia.src}>
                {currentMedia.type === 'IMAGE' ? (
                    <img
                        src={currentMedia.src}
                        className="mediaGalery_media_image"
                        alt="workImg"
                    />
                ) : (
                    <Video url={currentMedia.src} />
                )}
            </div>

            <div className="mediaGalery_navigation">
                <button type="button" onClick={handlePrev}>{"<"}</button>
                <span>{currentIndex + 1} / {media.length}</span>
                <button type="button" onClick={handleNext}>{">"}</button>
            </div>
        </div>
    );
};

export default MediaGalery;
