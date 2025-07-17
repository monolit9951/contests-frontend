import { FC, useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { Prize } from 'entities/prize'
import { selectContestPrizes } from 'pages/contestPage/model/selectors'
import { useAppSelector } from 'shared/lib/store'
import { Button } from 'shared/ui/button'
import { Image } from 'shared/ui/image'
import { MediaFeedback } from 'shared/ui/mediaFeedback'
import { ModalWindow } from 'shared/ui/modalWindow'
import { VStack } from 'shared/ui/stack'
// import { Text } from 'shared/ui/text'
// import { UserIcon } from 'shared/ui/userIcon'
import { Video } from 'shared/ui/videoPlayer'
import { WorkPreview } from 'widgets/worksSection/ui/workPreview/workPreview'

import { Work } from '../model/types'

import MediaOverlay from './overlay/mediaOverlay'

import './workCard.scss'

interface Props {
    data: Work
    prizeId?: string
    className?: string,
}


const WorkCard: FC<Props> = (props) => {
    const { data, prizeId, className } = props

    const prizes = useAppSelector(selectContestPrizes) as Prize[]

    const { typeWork, media, user } = data

    const prize = prizes.find((item) => item.id === prizeId)

    const [openModal, setOpenModal] = useState<boolean>(false)

    const handleOpenModal = () => {
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
    }

    const [comments, setComments] = useState<number>(data.commentAmount)

    // колбек для изменения колличества комментов 
    // const handleChangeComments = (change: 'INCREMENT' | 'DECREMENT') => {
    //     if (change === 'DECREMENT'){
    //         setComments(comments - 1)
    //     }

    //     if (change === 'INCREMENT'){
    //         setComments(comments + 1)
    //     }
    // }


    return (
        <li className='li'>
            <VStack className={clsx('media-work', className)}>
                <div className='media-work__container'>
                    <MediaOverlay
                        prize={prize}
                        user={user}
                        imageCards={typeWork === 'IMAGE'}
                    />
                    {data.media && data.media[0].typeMedia === 'VIDEO' && media?.[0]?.mediaLink && (
                        <Button
                            variant='div'
                            onClick={handleOpenModal}
                            className='media-work__video'>
                            <Video url={media[0].mediaLink} light />
                        </Button>
                    )}
                    {data.media && data.media[0].typeMedia === 'IMAGE'&& media?.[0]?.mediaLink && (
                        <Image
                            src={media?.[0].mediaLink}
                            alt='media'
                            width={458}
                            height={612}
                            onClick={handleOpenModal}
                            className='media-work__frame'
                        />
                    )}
                </div>
                <MediaFeedback
                    id={data.id}
                    likes={data.likeAmount}
                    comments={comments}
                    onCommentsClick={handleOpenModal}
                    liked = {data.userLike}
                />
            </VStack>

            {openModal && <ModalWindow isOpen onClose={handleCloseModal}><WorkPreview work={data} /></ModalWindow>}
        </li>
    )
}

export default WorkCard
