import { FC, useMemo, useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { useGetRequest } from 'shared/lib/hooks/useGetRequest'
import { Button } from 'shared/ui/button'
import { Image } from 'shared/ui/image'
import { MediaFeedback } from 'shared/ui/mediaFeedback'
import { ModalWindow } from 'shared/ui/modalWindow'
import { VStack } from 'shared/ui/stack'
// import { Text } from 'shared/ui/text'
// import { UserIcon } from 'shared/ui/userIcon'
import { Video } from 'shared/ui/videoPlayer'
import ModalReport from 'widgets/modalReport'
import { WorkPreview } from 'widgets/worksSection/ui/workPreview/workPreview'

import { getWorkById } from '../model/services/workServices'
import { Work } from '../model/types'

import MediaOverlay from './overlay/mediaOverlay'

import './workCard.scss'

interface Props {
    data: Work
    // prizeId?: string
    className?: string,
}


const WorkCard: FC<Props> = (props) => {
    const { data, 
        // prizeId,
         className } = props

    // const prizes = useAppSelector(selectContestPrizes) as Prize[]

    // const prize = prizes.find((item) => item.id === prizeId)

    const [openModal, setOpenModal] = useState<boolean>(false)
    const [workKey, setWorkKey] = useState<number>(0)

    const handleOpenModal = async () => {
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false)

        // при закрытии модалки, заново делаем запрос на сервер, чтоб обновить инфу
        setWorkKey(workKey + 1)         
    }

    const {data: workData, isLoaded: workDataLoaded} = useGetRequest({fetchFunc: () => getWorkById(data.id), key: [workKey], enabled: true})

    
    // мемоизация видео, необходимо из-за особенности ререндера Plyr-видео
    const videoBlock = useMemo(() => {
        if (!workDataLoaded || !workData.media || workData.media.length === 0) return null;

        const mediaItem = workData.media[0];


        return <Video url={mediaItem.mediaLink} light />;
        
    }, [workDataLoaded, workData?.media?.[0]?.mediaLink]);

    const [reportModal, setReportModal] = useState<boolean>(false)

    const handleReportCallback = () => {
        setReportModal(true)
    }

    return (
        <li className='li'>
            <VStack className={clsx('media-work', className)}>
                <div className='media-work__container'>
                    {workDataLoaded && <MediaOverlay
                        prize={workData.prize}
                        user={workData.user}
                        imageCards={workData.typeWork === 'IMAGE'}
                        handleReportCallback = {handleReportCallback}
                    />}
                    {workDataLoaded && workData.media && workData.media[0]?.typeMedia === 'VIDEO' && workData.media?.[0]?.mediaLink && (
                        <Button
                            variant='div'
                            onClick={handleOpenModal}
                            className='media-work__video'>
                            {videoBlock}
                        </Button>
                    )}
                    {workDataLoaded && workData.media && workData.media[0]?.typeMedia === 'IMAGE'&& workData.media?.[0]?.mediaLink && (
                        <Image
                            src={workData.media?.[0].mediaLink}
                            alt='media'
                            width={458}
                            height={612}
                            onClick={handleOpenModal}
                            className='media-work__frame'
                        />
                    )}
                    {
                        workDataLoaded && workData.media.length === 0 && (<div>{workData.description}</div>)
                    }
                </div>
                {workDataLoaded && <MediaFeedback
                    id={workData.id}
                    likes={workData.likeAmount}
                    comments={workData.commentAmount}
                    onCommentsClick={handleOpenModal}
                    liked = {workData.userLike}
                />}
            </VStack>
            
            {reportModal && <ModalWindow isOpen onClose={() => setReportModal(false)}><ModalReport targetType='WORK' targetId={workData.id}/></ModalWindow>}
            {openModal && <ModalWindow isOpen onClose={handleCloseModal}><WorkPreview work={workData} /></ModalWindow>}
        </li>
    )
}

export default WorkCard
