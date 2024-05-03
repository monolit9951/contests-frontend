import { useState } from 'react'
import clsx from 'clsx'
import caretDown from 'shared/assets/icons/caretDown.svg?react'
import caretUp from 'shared/assets/icons/CaretUp.svg?react'
import { Icon } from 'shared/ui/icon'
import { Input } from 'shared/ui/input'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import { FilterObject } from '../../model/types'

import FilterItem from './filterItem'

interface FilterBlockProps {
    filter?: FilterObject
    className?: string
}

export default function FilterBlock(props: FilterBlockProps) {
    const { filter, className } = props

    const [blockShown, setBlockShown] = useState(false)

    const onIconClick = () => {
        setBlockShown(!blockShown)
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
                            onClick={onIconClick}
                        />
                    </HStack>
                    <ul
                        className={clsx(
                            'filter-block__list',
                            blockShown && 'filter-block__hidden'
                        )}>
                        {filter.items.map(({ name, number }) => (
                            <FilterItem
                                key={name}
                                name={name}
                                number={number}
                            />
                        ))}
                    </ul>
                </>
            )
        }

        return (
            <>
                <HStack className='justify__between'>
                    <Text Tag='h4' bold className='filter-block__title'>
                        Money prize amount
                    </Text>
                    <Icon
                        Svg={blockShown ? caretUp : caretDown}
                        clickable
                        onClick={onIconClick}
                    />
                </HStack>
                <VStack
                    className={clsx(
                        'filter-range',
                        blockShown && 'filter-block__hidden'
                    )}>
                    <HStack className='justify__between filter-range__block'>
                        <HStack className='align__center'>
                            <Text Tag='span'>From</Text>
                            <Text Tag='span' className='filter-range__number'>
                                1 000 $
                            </Text>
                        </HStack>
                        <HStack className='align__center '>
                            <Text Tag='span'>To</Text>
                            <Text Tag='span' className='filter-range__number'>
                                100 000 $
                            </Text>
                        </HStack>
                    </HStack>
                    <Input type='range' className='filter-range__input' />
                </VStack>
            </>
        )
    }

    return (
        <VStack className={clsx('filter-wrapper__block', className)}>
            {renderUI()}
        </VStack>
    )
}
