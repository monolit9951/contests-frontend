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
        typeWork,
        workAddingDate,
    } = work

    const timeAgo = moment(workAddingDate).fromNow()

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore)
    }

    const onCommentsClick = () => {
        openModal(work)
    }

    return (
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

            {typeWork === 'IMAGE' && media && (
                <Image src={media[0].mediaLink} alt={`User's image`} />
            )}
            {work.typeWork === 'VIDEO' && media && (
                <video
                    width={420}
                    height={720}
                    src={media[0].mediaLink}
                    autoPlay
                    controls
                    muted
                    loop
                />
            )}

            <MediaFeedback
                id={id}
                likes={likeAmount}
                comments={commentAmount}
                onCommentsClick={onCommentsClick}
            />
        </Button>
    )
}

export default WorkComponent
