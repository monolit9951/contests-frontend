import { FC, useState } from 'react'
import clsx from 'clsx'
import { Prize, TopPrize } from 'entities/prize'
import { selectContestPrizes } from 'pages/contestPage/model/selectors'
import { useAppSelector } from 'shared/lib/store'
import { Button } from 'shared/ui/button'
import { Image } from 'shared/ui/image'
import { MediaFeedback } from 'shared/ui/mediaFeedback'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'
import { UserIcon } from 'shared/ui/userIcon'
import { Video } from 'shared/ui/videoPlayer'

import { Work } from '../model/types'

import MediaOverlay from './overlay/mediaOverlay'

import './workCard.scss'
import { ModalWindow } from 'shared/ui/modalWindow'
import { WorkPreview } from 'widgets/worksSection/ui/workPreview/workPreview'
import { useLocation, useNavigate } from 'react-router-dom'

interface Props {
    data: Work
    prizeId?: string
    className?: string,
}


const WorkCard: FC<Props> = (props) => {
    const { data, prizeId, className } = props
    // console.log(data)
    const [isReadMore, setIsReadMore] = useState(false)

    const prizes = useAppSelector(selectContestPrizes) as Prize[]

    const { description, typeWork, media, user } = data

    const prize = prizes.find((item) => item.id === prizeId)

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore)
    }

    // const onOpenModal = () => {
    //     openModal(data)
    // }

    const [openModal, setOpenModal] = useState<boolean>(false)

    const handleOpenModal = () => {
        setOpenModal(true)
    }

    const handleCloseModal = () => {
        setOpenModal(false)
    }


    // текстовых ворков больше нет
    if (typeWork === 'TEXT') {
        return (
            <li className='class1'>
                <VStack className={clsx('text-work', className)}>
                    <HStack className='justify__between align__center'>
                        <UserIcon
                            src={user.profileImage}
                            size={40}
                            userName={user.name}
                        />
                        {prize && <TopPrize data={prize} />}
                    </HStack>
                    <Text
                        Tag='p'
                        className='text-work__text'
                        onClick={() => {setOpenModal(true)}}>
                        {(description.length < 430 && description) || (
                            <>
                                {!isReadMore
                                    ? description.slice(0, 430)
                                    : `${description}`}
                                <button
                                    type='button'
                                    className='read-more-btn'
                                    onClick={toggleReadMore}>
                                    {!isReadMore ? '... more' : 'show less'}
                                </button>
                            </>
                        )}
                    </Text>
                    <MediaFeedback
                        id={data.id}
                        likes={data.likeAmount}
                        comments={data.commentAmount}
                        onCommentsClick={handleOpenModal}
                    />
                </VStack>
            </li>
        )
    }




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
                    comments={data.commentAmount}
                    onCommentsClick={handleOpenModal}
                />
            </VStack>

            {openModal && <ModalWindow isOpen onClose={handleCloseModal}><WorkPreview work={data}/></ModalWindow>}
        </li>
    )
}

export default WorkCard
