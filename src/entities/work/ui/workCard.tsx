import { FC, useState } from 'react'
import clsx from 'clsx'
import { Prize, TopPrize } from 'entities/prize'
import { selectContestPrizes } from 'pages/contestPage/model/selectors'
import { useAppSelector } from 'shared/lib/store'
import { Image } from 'shared/ui/image'
import { MediaFeedback } from 'shared/ui/mediaFeedback'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'
import { UserIcon } from 'shared/ui/userIcon'

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

    const prize = prizes.find((item) => item.id === prizeId)

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore)
    }

    const onOpenModal = () => {
        openModal(data)
    }

    if (data.typeWork === 'TEXT') {
        return (
            <li>
                <VStack className={clsx('text-work', className)}>
                    <HStack className='justify__between align__center'>
                        <UserIcon
                            src={data.user.profileImage}
                            size={40}
                            userName={data.user.name}
                        />
                        {prize && <TopPrize data={prize} />}
                    </HStack>
                    <Text
                        Tag='p'
                        className='text-work__text'
                        onClick={onOpenModal}>
                        {(data.description.length < 430 &&
                            data.description) || (
                            <>
                                {!isReadMore
                                    ? data.description.slice(0, 430)
                                    : `${data.description} `}
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
                    <MediaOverlay prize={prize} />
                    {data.typeWork === 'VIDEO' && (
                        <iframe
                            title='media'
                            width={458}
                            height={612}
                            src={data.media?.[0].mediaLink}
                            className='media-work__frame'
                        />
                    )}
                    {data.typeWork === 'IMAGE' && (
                        <Image
                            src={data.media?.[0].mediaLink}
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
