import React, { useState } from 'react'
import clsx from 'clsx'
import { useTheme } from 'entities/theme'
import { Work } from 'entities/work/model/types'
import moment from 'moment'
import Verified from 'shared/assets/icons/SealCheck.svg?react'
import tripleDot from 'shared/assets/icons/tripleDot.svg?react'
import prize from 'shared/assets/icons/trophyF.svg?react'
import { Icon } from 'shared/ui/icon'
import { MediaFeedback } from 'shared/ui/mediaFeedback'
import { Flex, HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'
import { UserIcon } from 'shared/ui/userIcon'
import { Video } from 'shared/ui/videoPlayer'
import { CommentsSection } from 'widgets/commentsSection'
import { ImageSlider } from 'widgets/worksSection/ui/workPreview/imageSlider/imageSlider'

import './workPreview.scss'

interface WorkProps {
    work: Work
}

export const WorkPreview: React.FC<WorkProps> = ({ work }) => {
    const { theme } = useTheme()

    const [isReadMore, setIsReadMore] = useState(false)

    const { media, workAddingDate, description, user } = work as Work

    const timeAgo = moment(workAddingDate).fromNow()

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore)
    }

    const onActionClick = () => {
        // eslint-disable-next-line no-alert
        alert('action clicked')
    }

    return (
        <Flex className='work-preview'>
            <HStack>
                {work.typeWork === 'IMAGE' && media && (
                    <ImageSlider images={media} />
                )}
                {work.typeWork === 'VIDEO' && media && (
                    <Video
                        url={media[0].mediaLink}
                        width={668}
                        className='preview__video'
                    />
                )}

                <VStack
                    className={clsx(
                        'work-desc',
                        work.typeWork === 'TEXT' && 'type-text'
                    )}>
                    <VStack className='upper-desc'>
                        <HStack className='creator-desc'>
                            <HStack className='align__center'>
                                <UserIcon
                                    src={user.profileImage}
                                    userName={user.name}
                                    alt={`Creator's profile picture`}
                                    size={40}
                                />
                                {user.verificationStatus && <Verified />}
                                <Text
                                    Tag='span'
                                    className='upper-desc__timeago'>
                                    {timeAgo}
                                </Text>
                            </HStack>
                            <Icon
                                Svg={tripleDot}
                                clickable
                                onClick={onActionClick}
                            />
                        </HStack>
                        <Text Tag='p' className='work-desc__text'>
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
                                            {!isReadMore
                                                ? '... more'
                                                : 'show less'}
                                        </Text>
                                    </button>
                                </>
                            )}
                        </Text>
                        <HStack
                            className={clsx(
                                theme,
                                'tag-contest align__center'
                            )}>
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
                    </VStack>

                    <MediaFeedback id={work.id} likes={work.likeAmount} />

                    <CommentsSection ownerId={work.id} work />
                </VStack>
            </HStack>
        </Flex>
    )
}
