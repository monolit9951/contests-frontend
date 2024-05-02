import clsx from 'clsx'
import cross from 'shared/assets/icons/X.svg?react'
import { Button } from 'shared/ui/button'
import { Icon } from 'shared/ui/icon'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import { mockFilterData } from '../model/mockData'

import FilterBlock from './filterBlock'

import './filterModal.scss'

interface FilterModalProps {
    className?: string
}

export default function FilterModal(props: FilterModalProps) {
    const { className } = props

    const { status, prize, participants, creators } = mockFilterData

    const onClose = () => {}

    return (
        <VStack className={clsx('filter-wrapper', className)}>
            <HStack className='filter-wrapper__title-block justify__between'>
                <Text Tag='h3' size='l' bold>
                    Filters
                </Text>
                <Icon
                    Svg={cross}
                    clickable
                    onClick={onClose}
                    className='close-icon'
                />
            </HStack>

            <hr />

            <FilterBlock filter={status} />

            <FilterBlock filter={prize} />

            <FilterBlock />

            <FilterBlock filter={participants} />

            <FilterBlock filter={creators} />

            <hr />

            <HStack className='justify__between'>
                <Button variant='secondary' size='s'>
                    Clear all
                </Button>
                <Button variant='primary' size='s'>
                    Show 1205 contests
                </Button>
                {/* number from server ........ ^^  */}
            </HStack>
        </VStack>
    )
}
