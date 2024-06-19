import { FC } from 'react'
import clsx from 'clsx'
import first from 'shared/assets/icons/win1.svg'
import second from 'shared/assets/icons/win2.svg'
import third from 'shared/assets/icons/win3.svg'
import fourth from 'shared/assets/icons/win4.svg'
import { Image } from 'shared/ui/image'
import { HStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import { Prize } from '../model/types'

import './topPrize.scss'

interface Props {
    data: Prize
    className?: string
}

const TopPrize: FC<Props> = (props) => {
    const { data, className } = props

    const { prizeAmount, prizeType, prizeText, currency } = data

    const prizeIcon = () => {
        switch (data.place) {
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

    const currencySymbol = () => {
        switch (currency) {
            case 'EUR':
                return '\u20AC'
            case 'PLN':
                return 'z\u0142'
            case 'UAH':
                return '\u20B4'

            default:
                return '\u0024'
        }
    }

    return (
        <HStack className={clsx('top-prize__wrapper', className)}>
            <Image
                src={prizeIcon()}
                alt='place icon'
                width={22}
                height={22}
                className='image__no-select'
            />
            <Text
                Tag='span'
                size='sm'
                bold
                className={`top-prize__${data.place}-amount`}>
                {prizeType === 'ITEM'
                    ? `${prizeText}`
                    : `${prizeAmount} ${currencySymbol()}`}
            </Text>
        </HStack>
    )
}

export default TopPrize
