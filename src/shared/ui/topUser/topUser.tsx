import { FC } from 'react'
import crown from 'shared/assets/icons/crownSimple.svg?react'
import { Icon } from 'shared/ui/icon'
import { Flex } from 'shared/ui/stack'

import './topUser.scss'

interface TopUserProps {
    topRate: number
}

export const TopUser: FC<TopUserProps> = ({ topRate }) => {
    return (
        <Flex className='topUser align__center'>
            <Icon Svg={crown} width={14} height={14} />
            <span>TOP {topRate}</span>
        </Flex>
    )
}
