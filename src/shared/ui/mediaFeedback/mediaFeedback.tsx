import { FC } from 'react'
import clsx from 'clsx'
import bubble from 'shared/assets/icons/chat.svg?react'
import share from 'shared/assets/icons/share.svg?react'

import { Button } from '../button'
import { Icon } from '../icon'
import { RateButtons } from '../rateButtons'
import { HStack } from '../stack'
import { Text } from '../text'

import './mediaFeedback.scss'

interface Props {
    className?: string
}

const MediaFeedback: FC<Props> = (props) => {
    const { className } = props

    const onComment = () => {}

    const onShare = () => {}

    return (
        <HStack className={clsx('feedback__wrapper', className)}>
            <HStack>
                <RateButtons border />
                <Button
                    variant='secondary'
                    size='s'
                    aria-label='comment'
                    onClick={onComment}
                    className='feedback__button'>
                    <Icon Svg={bubble} width={20} height={20} />
                    <Text Tag='span'>201</Text>
                </Button>
            </HStack>
            <Button
                variant='secondary'
                size='s'
                icon={share}
                onClick={onShare}
                className='feedback__button'>
                Share
            </Button>
        </HStack>
    )
}

export default MediaFeedback
