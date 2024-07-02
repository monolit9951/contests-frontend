import React from 'react'
import { Work } from 'entities/work/model/types'
import { Button } from 'shared/ui/button'

import './workComponent.scss'

interface WorkProps {
    work: Work
    openModal: (work: Work) => void
}

const WorkComponent: React.FC<WorkProps> = ({ work, openModal }) => {
    return (
        <Button
            variant='div'
            className='work-component'
            onClick={() => openModal(work)}>
            <h2>{work.description}</h2>
            <p>{work.typeWork}</p>
            <p>Likes: {work.likeAmount}</p>
            <p>Comments: {work.commentAmount}</p>
            <div className='media'>
                {work.media?.map((media) => (
                    <img key={media.id} src={media.mediaLink} alt='' />
                ))}
            </div>
            <div className='user'>
                <img src={work.user.profileImage} alt='user profile' />
                <p>{work.user.name}</p>
                <p>Rating: {work.user.participantRating}</p>
            </div>
        </Button>
    )
}

export default WorkComponent
