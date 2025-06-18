import { FC, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player/lazy'
import clsx from 'clsx'
import Plyr from 'plyr-react'
import "plyr-react/plyr.css";
import './videoPlayer.scss'
import sampleVideo from '../../../shared/assets/testVideos/testVideo.mp4'
import { HStack } from '../stack';

interface Props {
    url: string
    width?: number
    height?: number
    light?: boolean
    className?: string
}

const Video: FC<Props> = (props) => {
    const { url, width = '100%', height = '100%', light, className } = props


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
        <div className='video_container'>
            <Plyr source={{type: "video", sources: [{src: sampleVideo, type: "video/mp4"}]}}/>
        </div>
    )
}

export default Video
