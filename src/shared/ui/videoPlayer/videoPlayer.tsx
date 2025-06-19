import { FC, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player/lazy'
import clsx from 'clsx'
import Plyr from 'plyr-react'
import './videoPlayer.scss'
import sampleVideo from '../../../shared/assets/testVideos/testVideo.mp4'
import "plyr-react/plyr.css";

interface Props {
    url: string
    width?: number
    height?: number
    light?: boolean
    className?: string
}

const Video: FC<Props> = (props) => {
    const { url, light, className } = props

    // настройки проигрывателя Plyr
    const plyrOptions = {
        controls: light ? [
            'play-large',
        ] : [
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
            <Plyr options={plyrOptions} source={{type: 'video', sources: [{src: sampleVideo, type: 'video/mp4'}]}}/>
    )
}

export default Video
