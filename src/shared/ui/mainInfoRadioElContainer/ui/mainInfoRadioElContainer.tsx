import React, { useState } from 'react'
import { Icon } from 'shared/ui/icon'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import './mainInfoRadioElContainer.scss'

interface MainInfoRadioElContainerProps {
    text: string
    svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
    children: React.ReactNode[]
    currActive: string
}

export const MainInfoRadioElContainer = ({
    text,
    svg,
    children,
    currActive,
}: MainInfoRadioElContainerProps) => {
    const [currSelected, setCurrSelected] = useState(currActive)
    return (
        <VStack className='mainInfoRadioElContainer_container'>
            <HStack className='text_icon_container'>
                <Text Tag='p'>{text}</Text>
                <Icon Svg={svg} height={20} width={20} />
            </HStack>
            <HStack className='radioElements_container'>
                {children.map((child, index) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(
                            child as React.ReactElement<any>,
                            { currSelected, setCurrSelected, key: index }
                        )
                    }
                    return null
                })}
            </HStack>
        </VStack>
    )
}
