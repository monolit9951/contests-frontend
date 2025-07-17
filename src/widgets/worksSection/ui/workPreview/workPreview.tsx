import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Work } from 'entities/work/model/types'
import moment from 'moment'
import { MediaFeedback } from 'shared/ui/mediaFeedback'
import { CommentsSection } from 'widgets/commentsSection'
import MediaGalery from 'widgets/mediaGalery'
import UserProfileData from 'widgets/userProfileData/userProfileData'

import './workPreview.scss'

interface WorkProps {
    work: Work
}

export const WorkPreview: React.FC<WorkProps> = ({ work }) => {

    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [windowWidth])

    const { media, workAddingDate, user } = work as Work

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
