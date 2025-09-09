import { type FC, useEffect, useRef, useState, useCallback } from "react";
import './customVideoPlayer.scss'
import Spinner from "shared/ui/spinner";

interface Props {
    src: string
    light?: boolean
    preload?: 'none' | 'metadata' | 'auto'
    maxBufferSize?: number 
}

const CustomVideoPlayer: FC<Props> = ({ 
    src, 
    light, 
    preload = 'auto',
    maxBufferSize = 10 //  ОБЯЗАТЕЛЬНО В МЕГАБАЙТАХ, НЕ УКАЗЫВАТЬ МНОГО
}) => {
    const videoMainRef = useRef<HTMLVideoElement>(null)
    const videoSecRef = useRef<HTMLVideoElement>(null)
    const [isActive, setIsActive] = useState(false)
    const [progress, setProgress] = useState(0)
    const [isBuffering, setIsBuffering] = useState(false)
    const progressRef = useRef(0)

  // мемоизированный онПлей
    const onPlay = useCallback(() => {
        if (!videoMainRef.current || !videoSecRef.current) return;

        if (isActive) {
            videoMainRef.current.pause();
            videoSecRef.current.pause();
            setIsActive(false);
        } else {
            videoMainRef.current.play().catch(e => console.error("Play failed:", e));
            
            setTimeout(() => {
                if (videoSecRef.current) {
                videoSecRef.current.play().catch(e => console.error("Secondary play failed:", e));
            }
        }, 100);
        
            setIsActive(true);
        }
    }, [isActive]);

    // Функция очисктки буфера (мемо)
    const manageBuffer = useCallback(() => {
        const video = videoMainRef.current;
        if (!video || !video.seekable.length) return;

        // Вичесляет размер текущего буфера
        let bufferSize = 0;
            for (let i = 0; i < video.buffered.length; i++) {
            bufferSize += video.buffered.end(i) - video.buffered.start(i);
        }

        // Если буфер занял много места, то очищаем часть
        const bufferSizeMB = (bufferSize * video.duration * 0.000015).toFixed(2);

        if (parseFloat(bufferSizeMB) > maxBufferSize) {
            console.log(`Buffer size: ${bufferSizeMB}MB, clearing excess`);
        }
    }, [maxBufferSize]);

    useEffect(() => {
        const video = videoMainRef.current;
        if (!video) return () => {};

        // Обновляем ref вместо состояния для частых обновлений
        const updateProgress = () => {
            if (video.duration) {
                const newProgress = (video.currentTime / video.duration) * 100;
                setProgress(newProgress);
                progressRef.current = newProgress;
            }
        };

        const handleWaiting = () => setIsBuffering(true);
        const handlePlaying = () => setIsBuffering(false);
        const handleLoadStart = () => setIsBuffering(true);
        const handleCanPlay = () => setIsBuffering(false);

        video.addEventListener("timeupdate", updateProgress);
        video.addEventListener("waiting", handleWaiting);
        video.addEventListener("playing", handlePlaying);
        video.addEventListener("loadstart", handleLoadStart);
        video.addEventListener("canplay", handleCanPlay);
        
        // Для управления буфером
        video.addEventListener("progress", manageBuffer);

        // если есть прелоад, то выдаём его
        video.preload = light ? 'metadata' : preload;

        return () => {
            video.removeEventListener("timeupdate", updateProgress);
            video.removeEventListener("waiting", handleWaiting);
            video.removeEventListener("playing", handlePlaying);
            video.removeEventListener("loadstart", handleLoadStart);
            video.removeEventListener("canplay", handleCanPlay);
            video.removeEventListener("progress", manageBuffer);
        };
    }, [light, preload, manageBuffer]);

    // отловить перемещение
    const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const video = videoMainRef.current;
        const videoSec = videoSecRef.current;
        if (!video || !videoSec) return;

        const value = Number(e.target.value);
        const newTime = (value / 100) * video.duration;
        
        video.currentTime = newTime;
        videoSec.currentTime = newTime;
        setProgress(value);
    }, []);

    return (
        <div className="videoContainer">
            {isBuffering && (
                <Spinner center />
            )}
            <button onClick={onPlay} type="button" aria-label="VideoControl">
                {/* eslint-disable jsx-a11y/media-has-caption */}
                <video
                    src={src}
                    ref={videoMainRef}
                    className="video_main"
                    preload={light ? "metadata" : preload}
                    playsInline
                />
                <video
                    src={src}
                    ref={videoSecRef}
                    className="video_secondary"
                    preload={light ? "metadata" : preload}
                    muted
                    playsInline
                />
            </button>

            <div className="video_progressBar">
                <div className="video_progressBar_line" />
                <div
                className="video_progressBar_progress"
                style={{ width: `${progress}%` }}
                />
                <input
                    type="range"
                    className="video_progressBar_input"
                    min={0}
                    max={100}
                    step={0.1}
                    value={progress}
                    onChange={handleSeek}
                />
            </div>
        </div>
    )
}

export default CustomVideoPlayer;