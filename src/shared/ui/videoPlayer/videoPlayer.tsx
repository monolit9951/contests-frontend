import { FC, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player/lazy'
import clsx from 'clsx'
import Plyr from 'plyr-react'

import sampleVideo from "../../assets/testVideos/testVideo.mp4"
import { HStack } from '../stack';

import "plyr-react/plyr.css";
import './videoPlayer.scss'

interface Props {
    url: string
    light: boolean
}

const Video: FC<Props> = ({ url, light }) => {


    // настройки проигрывателя Plyr
    const plyrOptions = {
        controls: !light ? [
            'play-large',
            // 'play',
            // 'progress',
            // 'current-time',
            // 'mute',
            // 'volume',
            // 'captions',
            // 'settings',
            // 'pip',
            // 'airplay',
            // 'fullscreen'
        ] 
        : 
        [
            'play-large',
            'play',
            'progress',
            'current-time',
            'mute',
            'volume',
            'captions',
            'settings',
            'pip',
            'airplay',
            'fullscreen'
        ],
        autoplay: light,
        clickToPlay: !light,
        hideControls: light,
        loop: { active: true },
        volume: 1
    }

    return (
        <Plyr options={plyrOptions} source={{type: "video", sources: [{src: sampleVideo, type: "video/mp4"}]}}/>
    )
}

export default Video
