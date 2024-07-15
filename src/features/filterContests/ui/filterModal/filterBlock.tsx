import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'
import {
    filterActions,
    FilterObject,
    selectActiveFilters,
} from 'features/filterContests'
import debounce from 'lodash.debounce'
import Slider from 'rc-slider'
import caretRight from 'shared/assets/icons/caretRight.svg?react'
import { useAppSelector } from 'shared/lib/store'
import { Icon } from 'shared/ui/icon'
import { Input } from 'shared/ui/input'
import { HStack, VStack } from 'shared/ui/stack'
import { Text } from 'shared/ui/text'

import FilterItem from './filterItem'

import 'rc-slider/assets/index.css'

interface FilterBlockProps {
    filter?: FilterObject
    className?: string
}

export default function FilterBlock(props: FilterBlockProps) {
    const { filter, className } = props

    const active = useAppSelector(selectActiveFilters)

    const [blockShown, setBlockShown] = useState(false)
    const [lowerBound, setLowerBound] = useState(active.prizeRange[0])
    const [upperBound, setUpperBound] = useState(active.prizeRange[1])
    const [sliderValue, setSliderValue] = useState([lowerBound, upperBound])

    const dispatch = useDispatch()

    useEffect(() => {
        setLowerBound(active.prizeRange[0])
        setUpperBound(active.prizeRange[1])
        setSliderValue([active.prizeRange[0], active.prizeRange[1]])
    }, [active.prizeRange])

    const onLowerBoundChange = (e: ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value
        if (inputValue.length > 6) {
            inputValue = inputValue.slice(0, 6)
        }

        setLowerBound(Number(inputValue))
        setSliderValue([Number(inputValue), upperBound])
    }

    const onUpperBoundChange = (e: ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value
        if (inputValue.length > 6) {
            inputValue = inputValue.slice(0, 6)
        }

        setUpperBound(Number(inputValue))
        setSliderValue([lowerBound, Number(inputValue)])
    }
    const onInputBlur = () => {
        setSliderValue([lowerBound, upperBound])
        dispatch(filterActions.updatePrizeRange([lowerBound, upperBound]))
    }

    const updatePrizeRange = (inputValue: number[]) => {
        dispatch(filterActions.updatePrizeRange(inputValue))
    }

    const updateRange = useCallback(debounce(updatePrizeRange, 400), [])

    const onSliderChange = (value: number | number[]) => {
        const inputValue = value as number[]

        setLowerBound(inputValue[0])
        setUpperBound(inputValue[1])

        setSliderValue(inputValue)
        updateRange(inputValue)
    }

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
                            Svg={caretRight}
                            clickable
                            onClick={onIconClick}
                            className={clsx(
                                blockShown
                                    ? 'filter-block__icon opened'
                                    : 'filter-block__icon closed'
                            )}
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
                                filter={filter}
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
                        Svg={caretRight}
                        clickable
                        onClick={onIconClick}
                        className={clsx(
                            blockShown
                                ? 'filter-block__icon opened'
                                : 'filter-block__icon closed'
                        )}
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
                            <Input
                                name='prizeFrom'
                                type='number'
                                value={lowerBound}
                                step={1000}
                                min={0}
                                max={upperBound - 1000}
                                onChange={onLowerBoundChange}
                                onBlur={onInputBlur}
                                className='filter-range__number'
                            />

                            <Text Tag='span'>$</Text>
                        </HStack>
                        <HStack className='align__center '>
                            <Text Tag='span'>To</Text>
                            <Input
                                name='prizeTo'
                                type='number'
                                value={upperBound}
                                step={1000}
                                min={lowerBound + 1000}
                                max={100000}
                                onChange={onUpperBoundChange}
                                onBlur={onInputBlur}
                                className='filter-range__number'
                            />
                            <Text Tag='span'>$</Text>
                        </HStack>
                    </HStack>
                    <Slider
                        range
                        allowCross={false}
                        draggableTrack
                        min={0}
                        max={100000}
                        step={1000}
                        pushable={1000}
                        value={sliderValue}
                        onChange={onSliderChange}
                    />
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
