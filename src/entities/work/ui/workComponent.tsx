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

interface WorkProps {
    work: Work
    openModal: (work: Work) => void
}

const WorkComponent: React.FC<WorkProps> = ({ work, openModal }) => {
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
    } = work
    
    const timeAgo = moment.utc(workAddingDate).local().fromNow();

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore)
    }

    const onCommentsClick = () => {
        openModal(work)
    }

    return (
        <div>
            <Button
                variant='div'
                className='work-component'
                onClick={() => openModal(work)}>
                <HStack className='align__center justify__start'>
                    <UserIcon
                        src={user.profileImage}
                        userName={user.name}
                        alt={`Creator's profile picture`}
                        size={40}
                    />
                    {user.verificationStatus && <Verified />}
                    <Text Tag='span' className='work-component__timeago'>
                        {timeAgo}
                    </Text>
                </HStack>

                <Text Tag='p' className='work-component__text'>
                    {(description.length < 250 && description) || (
                        <>
                            {!isReadMore
                                ? description.slice(0, 250)
                                : `${description} `}
                            <button
                                type='button'
                                className='read-more-btn'
                                onClick={toggleReadMore}>
                                <Text Tag='span'>
                                    {!isReadMore ? '... more' : 'show less'}
                                </Text>
                            </button>
                        </>
                    )}
                </Text>

                <HStack className={clsx('tag-contest align__center')}>
                    <div className='icon-box'>
                        <Icon Svg={prize} className='icon-work__prev' />
                    </div>
                    <Text Tag='p' size='xs' bold>
                        Acting Talent Search
                    </Text>
                    <Text Tag='span' size='xs'>
                        &#8226;
                    </Text>
                    <Text Tag='span' size='xs'>
                        Active
                    </Text>
                </HStack>

                {media?.[0]?.mediaLink && media?.[0]?.typeMedia === "IMAGE" && (
                    <Image
                        src={media[0].mediaLink}
                        alt={`User's image`}
                        width={420}
                        height={720}
                        className='work-component__image'
                    />
                )}
                {media?.[0]?.mediaLink && media?.[0]?.typeMedia === 'VIDEO' && (
                    <Video
                        url={media[0].mediaLink}
                        width={420}
                        height={720}
                        light
                        className='work-component__video'
                    />
                )}
            </Button>

            <MediaFeedback
                id={id}
                likes={likeAmount}
                comments={commentAmount}
                onCommentsClick={onCommentsClick}
                className='workComponent_mediafeedback'
            />
        </div>
    )
}

export default WorkComponent
