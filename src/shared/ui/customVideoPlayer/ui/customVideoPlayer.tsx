import { type FC, useEffect, useRef, useState } from "react";

import './customVideoPlayer.scss'

interface Props {
  src: string
  light?: boolean
}

const CustomVideoPlayer: FC<Props> = ({ src, light }) => {
  const videoMainRef = useRef<HTMLVideoElement>(null)
  const videoSecRef = useRef<HTMLVideoElement>(null)
  const [isActive, setIsActive] = useState(false)
  const [progress, setProgress] = useState(0)

  const onPlay = () => {
    if (!videoMainRef.current || !videoSecRef.current) return;

    if (isActive) {
      videoMainRef.current.pause();
      videoSecRef.current.pause();
      setIsActive(false);
    } else {
      videoMainRef.current.play();
      videoSecRef.current.play();
      setIsActive(true);
    }
  };

  useEffect(() => {
    const video = videoMainRef.current;
    if (!video) return () => {};

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener("timeupdate", updateProgress);
    return () => video.removeEventListener("timeupdate", updateProgress);
  }, []);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoMainRef.current;
    if (!video) return;

    const value = Number(e.target.value);
    video.currentTime = (value / 100) * video.duration;
    setProgress(value);
  };

  return (
    <div className="videoContainer">
      <button onClick={onPlay} type="button" aria-label="VideoControl">
        {/* eslint-disable jsx-a11y/media-has-caption */}
        <video
          src={src}
          ref={videoMainRef}
          className="video_main"
          preload={light ? "metadata" : "auto"}
        />
        <video
          src={src}
          ref={videoSecRef}
          className="video_secondary"
          preload={light ? "metadata" : "auto"}
          muted
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
