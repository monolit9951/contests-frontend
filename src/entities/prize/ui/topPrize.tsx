import { FC } from 'react'
import clsx from 'clsx'
import first from 'shared/assets/icons/win1.svg?react'
import second from 'shared/assets/icons/win2.svg?react'
import third from 'shared/assets/icons/win3.svg?react'
import { Icon } from 'shared/ui/icon'
import { HStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import './topPrize.scss'

type PrizePlaces = '1st' | '2nd' | '3rd'

interface Props {
    place: PrizePlaces
    className?: string
}

const TopPrize: FC<Props> = (props) => {
    const { place, className } = props

    const prizeIcon = {
        '1st': first,
        '2nd': second,
        '3rd': third,
    }

    const prizeAmount = {
        '1st': '10000 $',
        '2nd': '5000 $',
        '3rd': '2000 $',
    }

    return (
        <HStack className={clsx('top-prize__wrapper', className)}>
            <Icon Svg={prizeIcon[place]} width={22} height={22} />
            <Text
                Tag='span'
                size='sm'
                bold
                className={`top-prize__${place}-amount`}>
                {prizeAmount[place]}
            </Text>
        </HStack>
    )
}

export default TopPrize
