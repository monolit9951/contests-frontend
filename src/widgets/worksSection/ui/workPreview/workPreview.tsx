import React, { useEffect, useState } from 'react'
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
import MediaGalery from 'widgets/mediaGalery'
import { ImageSlider } from 'widgets/worksSection/ui/workPreview/imageSlider/imageSlider'

import './workPreview.scss'
import { Link } from 'react-router-dom'

interface WorkProps {
    work: Work
}

export const WorkPreview: React.FC<WorkProps> = ({ work }) => {
    const { theme } = useTheme()

    const [isReadMore, setIsReadMore] = useState(false)
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [windowWidth])

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
        <Flex className='workPreview'>
            <div className="workPreview_container">
                <div className="workPreview_content">
                    <MediaGalery media = {work.media}/>
                </div>

                <VStack
                    className={clsx(
                        'work-desc',
                        work.typeWork === 'TEXT' && 'type-text'
                    )}>
                        
                    <VStack className='upper-desc'>
                        <HStack className='creator-desc'>
                            <Link to={`/profile/${user.id}`}>
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
                            </Link>
                            <Icon
                                Svg={tripleDot}
                                clickable
                                onClick={onActionClick}
                            />
                        </HStack>

                        {windowWidth <= 1024 &&
                            media &&
                            (work.typeWork === 'IMAGE' ? (
                                <ImageSlider images={media} />
                            ) : (
                                <Video
                                    url={media[0].mediaLink}
                                    // width={500}
                                    // className='preview__video'
                                />
                            ))}

                        {description && (
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
                        )}

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

                    <CommentsSection workId={work.id} work />
                </VStack>
            </div>
        </Flex>
    )
}
