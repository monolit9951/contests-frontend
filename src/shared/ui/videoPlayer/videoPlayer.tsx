import { FC } from 'react'
import ReactPlayer from 'react-player/lazy'
import clsx from 'clsx'

import './videoPlayer.scss'

interface Props {
    url: string
    width?: number
    height?: number
    light?: boolean
    className?: string
}

const Video: FC<Props> = (props) => {
    const { url, width = '100%', height = 612, light, className } = props

    return (
        <ReactPlayer
            url={url}
            width={width}
            height={height}
            light={light}
            playing
            loop
            controls
            volume={1}
            className={clsx(className)}
        />
    )
}

export default Video
