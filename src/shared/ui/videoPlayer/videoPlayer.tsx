import React, { FC } from 'react'
import Plyr from 'plyr-react'

// import sampleVideo from "../../assets/testVideos/testVideo.mp4"
import "plyr-react/plyr.css";
import './videoPlayer.scss'


interface Props {
    url: string
    light?: boolean
}

const Video: FC<Props> = (props) => {
    const { url, light } = props

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

export default React.memo(Video);
