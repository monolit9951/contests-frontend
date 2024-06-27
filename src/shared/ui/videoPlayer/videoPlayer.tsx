import { FC } from 'react'
import ReactPlayer from 'react-player/lazy'
import clsx from 'clsx'

interface Props {
    url: string
    width?: number
    height?: number
    className?: string
}

const Video: FC<Props> = (props) => {
    const { url, width = 458, height = 612, className } = props

    return (
        <div className={clsx('video__wrapper', className)}>
            <ReactPlayer
                url={url}
                loop
                width={width}
                height={height}
                controls
                muted
            />
        </div>
    )
}

export default Video
