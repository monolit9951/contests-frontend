import { FC } from 'react'
import clsx from 'clsx'
import first from 'shared/assets/icons/win1.svg'
import second from 'shared/assets/icons/win2.svg'
import third from 'shared/assets/icons/win3.svg'
import { Image } from 'shared/ui/image'
import { HStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import './topPrize.scss'

export type PrizePlaces = '1st' | '2nd' | '3rd'

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
            <Image
                src={prizeIcon[place]}
                alt='place icon'
                width={22}
                height={22}
            />
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
