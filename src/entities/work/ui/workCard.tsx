import { FC, useState } from 'react'
import clsx from 'clsx'
import { TopPrize } from 'entities/prize'
import media from 'shared/assets/img/videoCard.webp'
import { Image } from 'shared/ui/image'
import { MediaFeedback } from 'shared/ui/mediaFeedback'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'
import { UserIcon } from 'shared/ui/userIcon'

import MediaOverlay from './overlay/mediaOverlay'

import './workCard.scss'

interface Props {
    place?: '1st' | '2nd' | '3rd'
    isText?: boolean
    className?: string
}

const WorkCard: FC<Props> = (props) => {
    const { place, isText, className } = props

    const [isReadMore, setIsReadMore] = useState(false)

    const toggleReadMore = () => {
        setIsReadMore(!isReadMore)
    }

    const mediaObj = { video: false, mediaLink: 'https://examplemedia.com' }

    const text =
        'Prepare to be swept away by the whimsical charm of the Tickle Olympics, where hilarity reigns supreme and every tickle is a step closer to victory! As athletes take to the stage, their faces adorned with mischievous grins, you can feel the anticipation building in the air. From the gentlest of touches to the most unexpected tickle tactics, competitors leave no stone unturned in their quest for gold. But it`s not just about the competitive lorem ipsum dolor'

    if (isText) {
        return (
            <li>
                <VStack className={clsx('work', className)}>
                    <HStack className='justify__between align__center'>
                        <UserIcon size={40} userName='Devin Reynolds' />
                        {place && <TopPrize place={place} />}
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
                    <MediaFeedback />
                </VStack>
            </li>
        )
    }

    return (
        <li>
            <VStack className={clsx('media', className)}>
                <div className='media__container'>
                    <MediaOverlay place={place} />
                    {mediaObj.video ? (
                        <iframe
                            title='media'
                            width={458}
                            height={612}
                            src={mediaObj.mediaLink}
                            className='media__frame'
                        />
                    ) : (
                        <Image
                            src={media}
                            alt='media'
                            width={458}
                            height={612}
                            className='media__frame'
                        />
                    )}
                </div>
                <MediaFeedback />
            </VStack>
        </li>
    )
}

export default WorkCard
