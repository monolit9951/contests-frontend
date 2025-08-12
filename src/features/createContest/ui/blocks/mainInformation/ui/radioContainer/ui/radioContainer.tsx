import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import questionMark from 'shared/assets/icons/question-mark.svg?react'
import { Icon } from 'shared/ui/icon'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import './radioContainer.scss'

interface RadioContainerProps {
    text: string
    children: React.ReactNode[]
    currActive: string
}

export const RadioContainer: React.FC<RadioContainerProps> = ({
    text,
    children,
    currActive,
}) => {
    const [currSelected, setCurrSelected] = useState<string>(currActive)

    const { setValue } = useFormContext()

    const handleClick = (childText: string) => {
        let value
        if (text === 'Type of competition') {
            setValue('contestOpen', childText === 'Open')
        } else if (text === 'Winner selection type') {
            switch (childText) {
                case 'Viewer voting':
                    value = 'VIEWER_VOTING'
                    break
                case "Creator's decision":
                    value = 'CREATOR_DECISION'
                    break
                default:
                    value = 'RANDOM'
                    break
            }
            setValue('selectionType', value)
        }
        setCurrSelected(childText)
    }

    return (
        <VStack className='radioContainer'>
            <HStack className='text_icon_container'>
                <Text Tag='p' className='radioContainer_text'>{text}</Text>
                <Icon Svg={questionMark} height={20} width={20} />
            </HStack>
            <HStack className='radioElements_container'>
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, {
                            currSelected,
                            handleClick,
                        } as any)
                    }
                    return null
                })}
            </HStack>
        </VStack>
    )
}
