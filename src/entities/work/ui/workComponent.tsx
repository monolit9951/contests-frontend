import React, { useState } from 'react'
import clsx from 'clsx'
import { Work } from 'entities/work'
import moment from 'moment'
import Verified from 'shared/assets/icons/SealCheck.svg?react'
import prize from 'shared/assets/icons/trophyF.svg?react'
import { Button } from 'shared/ui/button'
import { Icon } from 'shared/ui/icon'
import { Image } from 'shared/ui/image'
import { MediaFeedback } from 'shared/ui/mediaFeedback'
import { HStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'
import { UserIcon } from 'shared/ui/userIcon'
import { Video } from 'shared/ui/videoPlayer'

import './workComponent.scss'
import VideoPlayer from 'shared/ui/videoPlayer/videoPlayer'

interface WorkProps {
    work: Work
}

const WorkComponent: React.FC<WorkProps> = ({ work }) => {
    const [isReadMore, setIsReadMore] = useState(false)

    const {
        id,
        media,
        user,
        description,
        commentAmount,
        likeAmount,
        // typeWork,
        workAddingDate,
        userLike
    } = work
    
    const timeAgo = moment.utc(workAddingDate).local().fromNow();

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore)
    }

    console.log(work)

    return (
        <div className="workComponent">

            <Button className="workComponent_container" variant='primary'>
                {work.media && work.media[0].typeMedia === 'IMAGE' && <img src={work.media[0].mediaLink} alt='mediaWork' />}
                {work.media && work.media[0].typeMedia === 'VIDEO' && <Video url={work.media[0].mediaLink} light/>}
            </Button>

            <MediaFeedback
                id={id}
                likes={likeAmount}
                comments={commentAmount}
                className='workComponent_mediafeedback'
                liked={userLike}
            />
        </div>
    )
}

export default WorkComponent
