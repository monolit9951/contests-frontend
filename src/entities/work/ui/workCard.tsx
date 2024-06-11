import { FC, useState } from 'react'
import clsx from 'clsx'
import { TopPrize } from 'entities/prize'
import { PrizePlaces } from 'entities/prize/ui/topPrize'
import media from 'shared/assets/img/videoCard.webp'
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
    place?: number
    isText?: boolean
    className?: string
}

const WorkCard: FC<Props> = (props) => {
    const { data, place, isText, className } = props

    const [isReadMore, setIsReadMore] = useState(false)

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore)
    }

    const mediaLink = 'https://examplemedia.com'

    const text =
        'Prepare to be swept away by the whimsical charm of the Tickle Olympics, where hilarity reigns supreme and every tickle is a step closer to victory! As athletes take to the stage, their faces adorned with mischievous grins, you can feel the anticipation building in the air. From the gentlest of touches to the most unexpected tickle tactics, competitors leave no stone unturned in their quest for gold. But it`s not just about the competitive lorem ipsum dolor'

    if (data?.typeWork === 'TEXT' || isText) {
        return (
            <li>
                <VStack className={clsx('work', className)}>
                    <HStack className='justify__between align__center'>
                        <UserIcon
                            userImage={data.user.profileImage}
                            size={40}
                            userName={data.user.name}
                        />
                        {place && <TopPrize place={place as PrizePlaces} />}
                    </HStack>
                    <Text Tag='p' className='work__text'>
                        {(text.length < 430 && text) || (
                            <>
                                {!isReadMore ? text.slice(0, 430) : `${text} `}
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
                    />
                </VStack>
            </li>
        )
    }

    return (
        <li>
            <VStack className={clsx('media', className)}>
                <div className='media__container'>
                    <MediaOverlay place={place as PrizePlaces} />
                    {data?.typeWork === 'VIDEO' && (
                        <iframe
                            title='media'
                            width={458}
                            height={612}
                            src={data.media?.[0].mediaLink ?? mediaLink}
                            className='media__frame'
                        />
                    )}
                    {data?.typeWork === 'IMAGE' && (
                        <Image
                            src={data.media?.[0].mediaLink ?? media}
                            alt='media'
                            width={458}
                            height={612}
                            className='media__frame'
                        />
                    )}
                </div>
                <MediaFeedback
                    id={data.id}
                    likes={data.likeAmount}
                    comments={data.commentAmount}
                />
            </VStack>
        </li>
    )
}

export default WorkCard
