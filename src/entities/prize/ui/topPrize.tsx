import { FC } from 'react'
import clsx from 'clsx'
import { HStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import { Prize } from '../model/types'

import { PrizeIcon } from './prizeIcon'

import './topPrize.scss'

interface Props {
    data: Prize
    className?: string
}

const TopPrize: FC<Props> = (props) => {
    const { data, className } = props

    const { place, prizeAmount, prizeType, prizeText, currency } = data

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
            <PrizeIcon
                place={place}
                width={22}
                height={22}
                className='image__no-select'
            />
            <Text
                Tag='span'
                size='sm'
                bold
                className={`top-prize__${place}-amount`}>
                {prizeType === 'COINS'
                    ? `${prizeText}`
                    : `${prizeAmount} ${currencySymbol()}`}
            </Text>
        </HStack>
    )
}

export default TopPrize
