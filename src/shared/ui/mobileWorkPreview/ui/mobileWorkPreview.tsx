import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { Work } from 'entities/work'
import comments from 'shared/assets/icons/commentsF.svg'
import share from 'shared/assets/icons/shareF.svg'
import cross from 'shared/assets/icons/X.svg'
import { useAlert } from 'shared/lib/hooks/useAlert/useAlert'
import { RateButtons } from 'shared/ui/rateButtons'
import { WorkPreviewContest } from 'shared/ui/workPreviewContest'
import UserProfileData from 'widgets/userProfileData/userProfileData'

import MobileWorkTopPanel from './components/mobileWorkTopPanel/mobileWorkTopPanel'

import './mobileWorkPreview.scss'


interface Props {
    isFeed?: boolean
    work: Work
}


const MobileWorkPreview: FC <Props> = ({isFeed, work}) => {
    const {showAlert, Alert} = useAlert()

    // const {data: work, isLoaded: workLoaded} = useGetRequest({fetchFunc: () => getWorkById(workId), enabled: true, key: []})
    const [commentsShow, setCommentsShow] = useState<boolean>(false)

    const longDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

    const [moreDescription, setMoreDescription] = useState<boolean>(false)

    // открыть весь текст (недоделано)
    const handleMore = () => {
        setMoreDescription(!moreDescription)
    }

    // открыть модалку комментов
    const handleComments = () => {
        setCommentsShow(!commentsShow)
    }

    // share
    const handleMobileShare = async () => {
        const text = 'some share text'
        const url = 'http://localhost:3000/battles or any else url'
        if (navigator.share) {
            try {
                await navigator.share({text, url })
            } catch (err) {
                // ALERT
                showAlert("SHARE ERROR", 'Cannot share')
            }
        } else {
            // ALERT
           showAlert("ERRPR", "Web Share API CANT WORK")
        }
    }

    return( 
        <div className={`mobileWorkPreview ${isFeed && 'feed'}`}>
            <div className="mobileWorkPreview_container">
                { work.media && work.media.length > 0 && <img src={work.media[0].mediaLink} alt="media" />}

                <MobileWorkTopPanel />


                <div className="mobileWorkPreview_inner">
                    {work && <div className="mobileWorkPreview_description">
                        <Link to='/'><UserProfileData user = {work.user}/></Link>

                        <div className="mobileWorkPreview_description_container">
                            <div className={`mobileWorkPreview_description_text ${!moreDescription && 'short'}`}>
                                {longDescription}
                            </div>

                            <button type='button' onClick={handleMore}>{moreDescription? 'Less' : 'More'}</button>
                        </div>

                        <Link to={`/contests/${work.contestId}`}><WorkPreviewContest /></Link>
                    </div>}

                    <ul className="mobileWorkPreview_controls">
                        {/* <li className="like">
                            {workLoaded && <button type='button' onClick={handleLike}>
                                <img src={work.userLike === 'LIKE'? likeF : like} alt="like" />
                                <div>{work.likeAmount}</div>
                            </button>}
                        </li>
                        <li className="dislike">
                            {workLoaded && <button type='button' onClick={handleDislike}>
                                <img src={work.userLike === 'DISLIKE'? dislikeF : dislike} alt="like" />
                                <div>dislike</div>
                            </button>}
                        </li> */}
                        <RateButtons work id={work.id} userLike={work.userLike} likes={work.likeAmount} mobile/>
                        <li className="comms">
                             <button type='button' onClick={handleComments}>
                                <img src={comments} alt="comms" />
                                <div>{work.commentAmount ?? 0}</div>
                            </button>
                        </li>
                        <li className="share">
                            <button type='button' onClick={handleMobileShare}>
                                <img src={share} alt="share" />
                                <div>Share</div>
                            </button>
                        </li>
                    </ul>
                </div>


                {commentsShow && <div className="mobileWorkPreview_commentsSection">

                    <div className="mobileWorkPreview_commentsSection_comments">
                        <div className="mobileWorkPreview_commentsSection_header">
                            <span>3.2k Comments</span>

                            <button type='button' onClick={handleComments}><img src={cross} alt="cross" /></button>
                        </div>
                    </div>

                    <button className="mobileWorkPreview_commentsSection_background" onClick={handleComments} type='button' aria-label='background' />

                </div>}
            </div>

            <Alert />
        </div>
    )
}

export default MobileWorkPreview