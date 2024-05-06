import { FC } from 'react'
import crown from 'shared/assets/icons/CrownSimple.svg?react'
import { Icon } from 'shared/ui/Icon'
import Flex from 'shared/ui/Stack/Flex/Flex'

import './topUser.scss'

interface TopUserProps {
    topRate: number
}

export const TopUser: FC<TopUserProps> = ({ topRate }) => {
    return (
        <Flex className='topUser'>
            <Icon Svg={crown} width={14} height={14} />
            <span>TOP {topRate}</span>
        </Flex>
    )
}
