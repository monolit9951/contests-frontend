import React from 'react'
import clsx from 'clsx'
import creatorsDecision from 'shared/assets/icons/creatorsDecision.svg?react'
import eye from 'shared/assets/icons/eye.svg?react'
import heart from 'shared/assets/icons/heart.svg?react'
import lock from 'shared/assets/icons/lock.svg?react'
import random from 'shared/assets/icons/random.svg?react'
import { Icon } from 'shared/ui/icon'
import { Flex, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import './radioEl.scss'

interface RadioElProps {
    text: string
    currSelected?: string
    handleClick?: (text: string) => void
}

export const RadioEl: React.FC<RadioElProps> = ({
    text,
    currSelected,
    handleClick,
}) => {
    const themedSvg = () => {
        switch (text) {
            case 'Open':
                return eye

            case 'Close':
                return lock

            case 'Random':
                return random

            case 'Viewer voting':
                return heart

            default:
                return creatorsDecision
        }
    }

    return (
        <Flex clickFunction={() => handleClick?.(text)}>
            <VStack
                className={clsx(
                    'radioEl_container',
                    text === currSelected && 'active'
                )}>
                <Icon Svg={themedSvg()} height={32} width={32} />
                <Text Tag='p' className='radioEl_container_text'>
                    {text}
                </Text>
            </VStack>
        </Flex>
    )
}
