import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { Button } from 'shared/ui/button'
import { CustomVideoPlayer } from 'shared/ui/customVideoPlayer'
import { Image } from 'shared/ui/image'
import { MediaFeedback } from 'shared/ui/mediaFeedback'
import { ModalWindow } from 'shared/ui/modalWindow'
import { VStack } from 'shared/ui/stack'
import ModalReport from 'widgets/modalReport'

import { Work } from '../model/types'

import MediaOverlay from './overlay/mediaOverlay'

import './workCard.scss'

interface Props {
    data: Work
    // prizeId?: string
    className?: string,
}


const WorkCard: FC<Props> = (props) => {
    const { 
        data,
        className,
        } = props

    const navigate = useNavigate()

    const handleOpenModal = () => {
        const params = new URLSearchParams();
        params.set("workId", data.id);

        navigate(`?${params.toString()}`, { replace: false, preventScrollReset: true });
    }

    
    // мемоизация видео, необходимо из-за особенности ререндера Plyr-видео
    // const videoBlock = useMemo(() => {
    //     if (!data?.media?.length) return null

    //     const mediaItem = data.media[0]
    //     return <CustomVideoPlayer src={mediaItem.mediaLink} light />
    // }, [data?.media])

    const [reportModal, setReportModal] = useState<boolean>(false)

    const handleReportCallback = () => {
        setReportModal(true)
    }


    return (
        <li className='li'>
            <VStack className={clsx('media-work', className)}>
                <div className='media-work__container'>
                    {data.user &&<MediaOverlay
                        // prize={data.prize}
                        user={data.user}
                        handleReportCallback = {handleReportCallback}
                    />}
                    {data.media && data.media[0]?.typeMedia === 'VIDEO' && data.media?.[0]?.mediaLink && (
                        <Button
                            variant='div'
                            onClick={handleOpenModal}
                            className='media-work__video'>
                            <CustomVideoPlayer src={ data.media[0].mediaLink} light preload='metadata' maxBufferSize={0.02}/>
                        </Button>
                    )}
                    {data.media && data.media[0]?.typeMedia === 'IMAGE'&& data.media?.[0]?.mediaLink && (
                        <Image
                            src={data.media?.[0].mediaLink}
                            alt='media'
                            width={458}
                            height={612}
                            onClick={handleOpenModal}
                            className='media-work__frame'
                        />
                    )}

                    {data.media?.length === 0 && <div>{data.description}</div>}

                </div>
                <MediaFeedback
                    id={data.id}
                    likes={data.likeAmount}
                    comments={data.commentAmount}
                    onCommentsClick={handleOpenModal}
                    liked = {data.userLike}
                />
            </VStack>

            {reportModal && <ModalWindow isOpen onClose={() => setReportModal(false)}><ModalReport targetType='WORK' targetId={data.id}/></ModalWindow>}
        </li>
    )
}

export default WorkCard
