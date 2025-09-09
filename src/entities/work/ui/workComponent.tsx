import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Work } from 'entities/work'
import dots from 'shared/assets/icons/tripleDot.svg'
import { Button } from 'shared/ui/button'
import { MediaFeedback } from 'shared/ui/mediaFeedback'
import { Video } from 'shared/ui/videoPlayer'
import UserProfileData from 'widgets/userProfileData/userProfileData'

import './workComponent.scss'

interface Props {
    work: Work
}

const WorkComponent: FC<Props> = ({ work }) => {

    const {
        id,
        media,
        user,
        description,
        commentAmount,
        likeAmount,
        // typeWork,
        // workAddingDate,
        userLike
    } = work
    
    // const timeAgo = moment.utc(workAddingDate).local().fromNow();
    const navigate = useNavigate()

    const handleOpenModal = () => {
        const params = new URLSearchParams();
        params.set("workId", id);

        navigate(`?${params.toString()}`, { replace: false, preventScrollReset: true });
    }

    return (
        <div className="workComponent">

            <div className="workComponent_info">

                <div className="workComponent_info_header">
                    <UserProfileData user={user}/>

                    <button type='button'><img src={dots} alt="dots" /></button>
                </div>

                <div className="workComponent_info_workText">{description}</div>

            </div>


            {media && media.length > 0 && <Button className="workComponent_container" variant='primary' onClick={handleOpenModal}>
                {media[0].typeMedia === 'IMAGE' && <img src={media[0].mediaLink} alt='mediaWork' />}
                {media[0].typeMedia === 'VIDEO' && <Video url={media[0].mediaLink} light/>}
            </Button>}

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
