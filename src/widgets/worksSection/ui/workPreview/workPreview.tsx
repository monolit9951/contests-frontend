import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getWorkById } from 'entities/work/model/services/workServices'
import moment from 'moment'
import { contestWorksActions } from 'pages/contestPage'
import { updateFeedWorkLike } from 'pages/feedPage/model/slice'
import dots from 'shared/assets/icons/tripleDot.svg'
import { useGetRequest } from 'shared/lib/hooks/useGetRequest'
import { useAppDispatch } from 'shared/lib/store'
import { MediaFeedback } from 'shared/ui/mediaFeedback'
import { ModalWindow } from 'shared/ui/modalWindow'
import Spinner from 'shared/ui/spinner'
import { CommentsSection } from 'widgets/commentsSection'
import MediaGalery from 'widgets/mediaGalery'
import ModalReport from 'widgets/modalReport'
import UserProfileData from 'widgets/userProfileData/userProfileData'

import './workPreview.scss'

interface WorkProps {
    contestLink?: boolean
    workId: string
    isFeed?: boolean
}

export const WorkPreview: React.FC<WorkProps> = ({contestLink, workId, isFeed }) => {

    const [controller, setController] = useState<boolean>(false)
    const [modalReport, setModalReport] = useState<boolean>(false)


    // ПОЛУЧЕНИЕ ДАННЫХ ДЛЯ АКТУАЛЬНОГО ОТОБРАЖЕНИЯ ЛАЙКОВ (ПОКА ЗАПРОС НА ВСЮ ИНФУ)
    const {data: workData, isLoaded: workDataLoaded} = useGetRequest({fetchFunc: () => getWorkById(workId), key: [], enabled: true})

    // const timeAgo = moment.utc(workData.workAddingDate).local().fromNow();
    const loginedUser = useSelector((state: RootState) => state.user)

    const handleController = () => {
        setController(!controller)
    }

    const handleReportWork = () => {
        setController(false)
        setModalReport(true)
    }

    // const handleChangeComment = () => {
    //     dispatch(contestWorksActions.updateWorkComments({
    //         workId: workData.id,
    //         commentAmount: 2
    //     }))
    // }

    // const handleChangeLike = (action: any) => {
    //     if(isFeed){
    //         console.log('feed')
    //     } else {
    //         console.log('contest')
    //     }
    // }


    const dispatch = useAppDispatch()

    // смена лайка и дизлайка в фиде и ворках контеста
    const handleLikeCallBack = (action: any) => {
        if(isFeed){
            dispatch(updateFeedWorkLike({
                workId,
                userLike: action.userLike,
                likeAmount: action.likeAmount
            }))
        } else {
            dispatch(contestWorksActions.updateWorkLike({
                workId,
                userLike: action.userLike,
                likeAmount: action.likeAmount
            }))
        }

    }


    return (
        <div className="workPreview">
            <div className="workPreview_container">
                {workDataLoaded && workData.media.length !== 0 && <div className="workPreview_left">
                    {workData.media !== null && <MediaGalery media={workData.media}/>}
                </div>}
                {!workDataLoaded && <div className="workPreview_left">
                    <Spinner center/>
                </div>}

                <div className="workPreview_right">
                    <div className="workPreview_right_topSection">
                        <div>
                            <div className="leftPart">
                                {workDataLoaded && <Link to={loginedUser.userId === workData.user.id? '/profile' : `/profile/${workData.user.id}`}>
                                    <UserProfileData user = {workData.user}/>
                                </Link>}

                                {workDataLoaded && <span>{moment.utc(workData.workAddingDate).local().fromNow()}</span>}
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

                        {workDataLoaded && <div className="workPreview_workText">{workData.description}</div>}

                        {/* <div className="active_contest">MAKE COMPONENT</div> */}
                        {contestLink && <Link to={`/contests/${workData.contestId}`}>contest</Link>}

                        {workDataLoaded && <MediaFeedback id={workId} likes={workData.likeAmount} liked={workData.userLike} handleLikeCallBack={handleLikeCallBack}/>}
                    </div>

                    <div className="workPreview_comments">
                        <CommentsSection work workId={workId}/>
                    </div>
                </div>
            </div>

            {modalReport && <ModalWindow isOpen onClose={() => {setModalReport(false)}}><ModalReport targetId={workData.id} targetType='WORK'/></ModalWindow>}
        </div>
    )
}
