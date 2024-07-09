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

interface Props {
    data: Work
    openModal: (work: Work) => void
    prizeId?: string
    className?: string
}

const WorkCard: FC<Props> = (props) => {
    const { data, openModal, prizeId, className } = props

    const [isReadMore, setIsReadMore] = useState(false)

    const prizes = useAppSelector(selectContestPrizes) as Prize[]

    const { description, typeWork, media, user } = data

    const prize = prizes.find((item) => item.id === prizeId)

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore)
    }

    const onOpenModal = () => {
        openModal(data)
    }

    if (typeWork === 'TEXT') {
        return (
            <li>
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
                        onClick={onOpenModal}>
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
                        onCommentsClick={onOpenModal}
                    />
                </VStack>
            </li>
        )
    }

    return (
        <li>
            <VStack className={clsx('media-work', className)}>
                <div className='media-work__container'>
                    <MediaOverlay
                        prize={prize}
                        user={user}
                        imageCards={typeWork === 'IMAGE'}
                    />
                    {typeWork === 'VIDEO' && media && (
                        <Button
                            variant='div'
                            onClick={onOpenModal}
                            className='media-work__video'>
                            <Video url={media[0].mediaLink} light />
                        </Button>
                    )}
                    {typeWork === 'IMAGE' && (
                        <Image
                            src={media?.[0].mediaLink}
                            alt='media'
                            width={458}
                            height={612}
                            onClick={onOpenModal}
                            className='media-work__frame'
                        />
                    )}
                </div>
                <MediaFeedback
                    id={data.id}
                    likes={data.likeAmount}
                    comments={data.commentAmount}
                    onCommentsClick={onOpenModal}
                />
            </VStack>
        </li>
    )
}

export default WorkCard
