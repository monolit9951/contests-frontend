import { useState } from 'react'
import clsx from 'clsx'
import caretDown from 'shared/assets/icons/caretDown.svg?react'
import caretUp from 'shared/assets/icons/CaretUp.svg?react'
import { Icon } from 'shared/ui/icon'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import { FilterObject } from '../model/types'

interface FilterBlockProps {
    filter?: FilterObject
    className?: string
}

export default function FilterBlock(props: FilterBlockProps) {
    const { filter, className } = props

    const [blockShown, setBlockShown] = useState(false)

    const onClick = () => {
        if (blockShown) {
            setBlockShown(false)
        } else {
            setBlockShown(true)
        }
    }

    function renderUI() {
        if (filter) {
            return (
                <>
                    <HStack className='justify__between'>
                        <Text Tag='h4' bold className='filter-block__title'>
                            {filter.name}
                        </Text>
                        <Icon
                            Svg={blockShown ? caretUp : caretDown}
                            clickable
                            onClick={onClick}
                        />
                    </HStack>
                    <ul
                        className={clsx(
                            'filter-block__list',
                            !blockShown && 'filter-block__shown'
                        )}>
                        {filter.items.map(({ name, number }) => (
                            <li key={name}>
                                <button
                                    type='button'
                                    aria-label={name}
                                    className='filter-item'>
                                    <Text Tag='span'>
                                        {name}
                                        <Text Tag='span' size='xs'>
                                            ({number})
                                        </Text>
                                    </Text>
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            )
        }

        return (
            <HStack className='justify__between'>
                <Text Tag='h4' bold className='filter-block__title'>
                    Money prize amount
                </Text>
                <Icon
                    Svg={blockShown ? caretUp : caretDown}
                    clickable
                    onClick={onClick}
                />
            </HStack>
        )
    }

    return (
        <VStack className={clsx('filter-wrapper__block', className)}>
            {renderUI()}
        </VStack>
    )
}
