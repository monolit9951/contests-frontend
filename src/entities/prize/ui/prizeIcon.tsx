import { FC } from 'react'
import first from 'shared/assets/icons/win1.svg'
import second from 'shared/assets/icons/win2.svg'
import third from 'shared/assets/icons/win3.svg'
import fourth from 'shared/assets/icons/win4.svg'
import { Image } from 'shared/ui/image'
import { VStack } from 'shared/ui/stack'

import './topPrize.scss'

interface Props {
    place: number
    width: number
    height: number
    className?: string
}

export const PrizeIcon: FC<Props> = (props) => {
    const { place, width, height, className } = props

    const prizeIcon = () => {
        switch (place) {
            case 1:
                return first
            case 2:
                return second
            case 3:
                return third

            default:
                return fourth
        }
    }

    return (
        <VStack className='prize-icon__wrapper'>
            <Image
                src={prizeIcon()}
                alt='prize icon'
                width={width}
                height={height}
                className={className ?? ''}
            />
            {place > 3 && <span>{place}</span>}
        </VStack>
    )
}
