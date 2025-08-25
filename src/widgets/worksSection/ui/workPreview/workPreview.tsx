import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getWorkById } from 'entities/work/model/services/workServices'
import { Work } from 'entities/work/model/types'
import moment from 'moment'
import dots from 'shared/assets/icons/tripleDot.svg'
import { useGetRequest } from 'shared/lib/hooks/useGetRequest'
import { MediaFeedback } from 'shared/ui/mediaFeedback'
import { ModalWindow } from 'shared/ui/modalWindow'
import Spinner from 'shared/ui/spinner'
import { CommentsSection } from 'widgets/commentsSection'
import MediaGalery from 'widgets/mediaGalery'
import ModalReport from 'widgets/modalReport'
import UserProfileData from 'widgets/userProfileData/userProfileData'

import './workPreview.scss'

interface WorkProps {
    work: Work
    contestLink?: boolean
}

export const WorkPreview: React.FC<WorkProps> = ({ work, contestLink }) => {

    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth)
    const [controller, setController] = useState<boolean>(false)
    const [modalReport, setModalReport] = useState<boolean>(false)

    console.log(work)

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


    // ПОЛУЧЕНИЕ ДАННЫХ ДЛЯ АКТУАЛЬНОГО ОТОБРАЖЕНИЯ ЛАЙКОВ (ПОКА ЗАПРОС НА ВСЮ ИНФУ)
    const {data: workData, isLoaded: workDataLoaded} = useGetRequest({fetchFunc: () => getWorkById(work.id), key: [], enabled: true})

    const handleController = () => {
        setController(!controller)
    }

    const handleReportWork = () => {
        setController(false)
        setModalReport(true)
    }

    return (
        <div className="workPreview">
            <div className="workPreview_container">
                {workDataLoaded && workData.media.length !== 0 && <div className="workPreview_left">
                    {media !== null && <MediaGalery media={media}/>}
                </div>}
                {!workDataLoaded &&  <div className="workPreview_left">
                    <Spinner center/>
                </div>}

                <div className="workPreview_right">
                    <div className="workPreview_right_topSection">
                        <div>
                            <div className="leftPart">
                                <Link to={loginedUser.userId === user.id? '/profile' : `/profile/${user.id}`}>
                                    <UserProfileData user = {work.user}/>
                                </Link>

                                <span>{timeAgo}</span>
                            </div>
                            
                            <div className="rightPart">
                                <div className='rightPart_controller'>
                                    <button onClick={handleController} type='button'><img src={dots} alt="dots"/></button>

                                    {controller && <ul className='rightPart_controls'>
                                        <li><button type='button' onClick={handleReportWork}>Report</button></li>
                                    </ul>}
                                    {/* eslint-disable-next-line */}
                                    {controller && <div className="rightPart_reportBtn_onBlur" onClick={handleController}/>}
                                </div>
                            </div>
                        </div>

                        <div className="workPreview_workText">{work.description}</div>

                        {/* <div className="active_contest">MAKE COMPONENT </div> */}
                        {contestLink && <Link to={`/contests/${work.contestId}`}>contest</Link>}

                        {workDataLoaded && <MediaFeedback id={work.id} likes={workData.likeAmount} liked={workData.userLike}/>}
                    </div>

                    <div className="workPreview_comments">
                        <CommentsSection work workId={work.id}/>
                    </div>
                </div>
            </div>

            {modalReport && <ModalWindow isOpen onClose={() => {setModalReport(false)}}><ModalReport targetId={workData.id} targetType='WORK'/></ModalWindow>}
        </div>
    )
}
