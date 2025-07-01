import { FC, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player/lazy'
import clsx from 'clsx'
import Plyr from 'plyr-react'
// import sampleVideo from "../../assets/testVideos/testVideo.mp4"
import sampleVideo from "../../assets/testVideos/wideVideo.mp4"
import { HStack } from '../stack';

import "plyr-react/plyr.css";
import './videoPlayer.scss'
import "plyr-react/plyr.css";

interface Props {
    url: string
    light?: boolean
}

const Video: FC<Props> = (props) => {
    const { url, light, className } = props

    // настройки проигрывателя Plyr
    const plyrOptions = {
        controls: light ? [
            'play-large',
        ] : [
            'play-large',
            'play',
            'progress',
            'current-time',
            'mute',
            'volume',
            'captions',
            // 'settings',
            // 'pip',s
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
        <Plyr options={plyrOptions} source={{type: 'video', sources: [{src: url, type: 'video/mp4'}]}}/>
    )
}

export default Video
