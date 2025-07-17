import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
import UserProfileData from 'widgets/userProfileData/userProfileData'
import { useSelector } from 'react-redux'

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

    const timeAgo = moment.utc(workAddingDate).local().fromNow();
    const loginedUser = useSelector((state: RootState) => state.user)
    return (
        <div className="workPreview">
            <div className="workPreview_container">
                <div className="workPreview_left">
                    <MediaGalery media={media}/>
                </div>

                <div className="workPreview_right">
                    <div className="workPreview_right_topSection">
                        <div>
                            <Link to={loginedUser.userId === user.id? '/profile' : `/profile/${user.id}`}>
                                <UserProfileData user = {work.user}/>
                            </Link>

                            <span>{timeAgo}</span>
                        </div>

                        <div className="workPreview_workText">{work.description}</div>

                        {/* <div className="active_contest">MAKE COMPONENT </div> */}

                        <MediaFeedback likes={work.likeAmount} liked={work.userLike}/>
                    </div>

                    <div className="workPreview_comments">
                        <CommentsSection work workId={work.id}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
