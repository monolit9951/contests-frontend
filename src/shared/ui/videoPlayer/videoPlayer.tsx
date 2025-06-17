import { FC, useEffect, useRef, useState } from 'react'
import Plyr from 'plyr-react'
import 'plyr-react/plyr.css'
import './videoPlayer.scss'
import clsx from 'clsx'

interface Props {
    url: string
    width?: string | number
    height?: string | number
    light?: boolean
    className?: string
}

const Video: FC<Props> = (props) => {
    const { url, width = '100%', height = '100%', light, className } = props

    // Настройки Plyr
    const plyrOptions = {
        controls: [
            'play-large',
            'progress',
            'current-time',
            'mute',
            'volume',
            'captions',
            'settings',
            'fullscreen'
        ],
        autoplay: false,
        clickToPlay: true,
        hideControls: light,
        ratio: '16:9'
    }

    return (
        <div className={clsx('video-container', className)} style={{ width, height }}>
            <Plyr 
                source={{
                    type: 'video',
                    sources: [{
                        src: url,
                        type: 'video/mp4'
                    }]
                }}
                options={plyrOptions}
            />
        </div>
    )
}

export default Video