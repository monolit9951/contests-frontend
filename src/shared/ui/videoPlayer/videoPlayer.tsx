import { FC, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player/lazy'
import clsx from 'clsx'
import Plyr from 'plyr-react'
import './videoPlayer.scss'
import sampleVideo from '../../../shared/assets/testVideos/testVideo.mp4'

interface Props {
    url: string
    width?: number
    height?: number
    light?: boolean
    className?: string
}

const Video: FC<Props> = (props) => {
    const { url, width = '100%', height = '100%', light, className } = props

    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const previewDivRef = useRef<HTMLDivElement>(null)
    const [previewImage, setPreviewImage] = useState('')

    if (light) {
        useEffect(() => {
            const captureFirstFrame = () => {
                const video = videoRef.current
                const canvas = canvasRef.current

                if (video && canvas) {
                    const context = canvas.getContext('2d')
                    if (context) {
                        context.drawImage(
                            video,
                            0,
                            0,
                            canvas.width,
                            canvas.height
                        )
                        const dataUrl = canvas.toDataURL('image/png')
                        setPreviewImage(dataUrl)
                    }
                }
            }

            const handleLoadedMetadata = () => {
                const video = videoRef.current
                if (video) {
                    video.currentTime = 0
                    video.addEventListener('seeked', captureFirstFrame)
                }
            }

            const video = videoRef.current
            if (video) {
                video.addEventListener('loadedmetadata', handleLoadedMetadata)
            }

            return () => {
                if (video) {
                    video.removeEventListener(
                        'loadedmetadata',
                        handleLoadedMetadata
                    )
                }
            }
        }, [url])
    }

    useEffect(() => {
        if (previewImage) {
            const previewDiv = previewDivRef.current

            if (previewDiv) {
                const backgroundImage = window
                    .getComputedStyle(previewDiv)
                    .getPropertyValue('background-image')
                if (!backgroundImage || backgroundImage === 'none') {
                    previewDiv.style.backgroundImage = `url(${previewImage})`
                }
            }
        }
    }, [previewImage])

    // настройки проигрывателя Plyr
    const plyrOptions = {
        controls: light ? [] : [
            'play-large',
            // 'play',
            'progress',
            'current-time',
            'mute',
            // 'volume',
            'captions',
            'settings',
            // 'pip',
            // 'airplay',
            // 'fullscreen'
        ],
        autoplay: !light,
        clickToPlay: !light,
        hideControls: light,
        loop: { active: true },
        volume: 1
    }

    return (
        <>
            <ReactPlayer
                url={sampleVideo}
                width={width}
                height={height}
                light={
                    light && (
                        <div
                            ref={previewDivRef}
                            className='react-player__preview'
                        />
                    )
                }
                playing
                loop
                controls
                volume={1}
                className={clsx(className)}
            />

            {/* <Plyr className='plur_video' options={plyrOptions} source={{type: 'video', sources: [{src: sampleVideo, type: 'video/mp4'}]}}/> */}

            {light && (
                <>
                    {/*  eslint-disable-next-line jsx-a11y/media-has-caption */}
                    <video
                        ref={videoRef}
                        src={sampleVideo}
                        preload='metadata'
                        style={{ display: 'none' }}
                        crossOrigin='anonymous'
                    />
                    <canvas ref={canvasRef} style={{ display: 'none' }} />
                </>
            )}
        </>
    )
}

export default Video
