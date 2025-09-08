import { type FC,useEffect, useRef, useState } from "react";

import './customVideoPlayer.scss'

interface Props {
    src: string
    light?: boolean
}


// для использования лучше всего разместить его в элемент с позишн релетив
// который уже будет иметь правильные макс видз и макс хейгх
// В РОДИТЕЛЕ НЕ ИСПОЛЬЗОВАТЬ ФИКСИРОВАННЫЕ height и witdh, КРОМЕ КРАЙНИХ СЛУЧАЕВ

const CustomVideoPlayer: FC<Props>= ({src, light}) => {
    const videoMainRef = useRef<HTMLVideoElement>(null)
    const videoSecRef = useRef<HTMLVideoElement>(null)
    const [isActive, setIsActive] = useState<boolean>(false)
    const [progress, setProgress] = useState<number>(0)
    const onPlay = () => {
        videoMainRef.current?.play()
        if(isActive){
            videoMainRef.current?.pause();
            videoSecRef.current?.pause()
            setIsActive(false)
        } else {
            videoMainRef.current?.play()
            videoSecRef.current?.play()
            setIsActive(true)
        }
    }

    // const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    //     if(!videoMainRef.current || !videoSecRef.current){
    //         return
    //     }

    //     const value = Number(event.target.value)
    //     videoMainRef.current.currentTime = ((videoMainRef.current.duration * value) / 100)
    //     videoSecRef.current.currentTime = ((videoMainRef.current.duration * value) / 100)
    // }

    useEffect(() => {
        const video = videoMainRef.current;
        if (!video) return () => {};

        const updateProgress = () => {
            if (video.duration) {
                setProgress((video.currentTime / video.duration) * 100);
            }
        };

        video.addEventListener("timeupdate", updateProgress);

        return () => {
            video.removeEventListener("timeupdate", updateProgress);
        };
        
    }, []);

    return(
        <div className="videoContainer">
            <button onClick={onPlay} type="button" aria-label="VideoControl">
                 {/* eslint-disable jsx-a11y/media-has-caption  */}
                <video src={src} ref={videoMainRef} className="video_main" preload={light? 'metadata' : 'auto'}/>
                <video src={src} ref= {videoSecRef} className="video_secondary" preload={light? 'metadata' : 'auto'} muted />    
            </button>

            <div className="video_progressBar">
                <div className="video_progressBar_line" />
                <div className="video_progressBar_progress" style={{width: `${progress}%`}}/>
            </div>
            {/* <input type="range" onChange={handleTimeChange}/> */}
        </div>
    )
}

export default CustomVideoPlayer