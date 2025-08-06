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
import { capitalizeStr } from 'shared/helpers'

interface FilterBlockProps {
    filter?: FilterObject
    className?: string
    rangeFilter?: 'MONEY' | 'COINS'
}

export default function FilterBlock(props: FilterBlockProps) {
    const { filter, className, rangeFilter = 'MONEY' } = props

    const active = useAppSelector(selectActiveFilters)
    const dispatch = useDispatch()

    // определяем, какое поле использовать в зависимости от rangeFilter
    const isMoney = rangeFilter === 'MONEY'
    const activeRange = isMoney ? active.prizeRange : active.coinRange
    const updateRangeAction = isMoney ? filterActions.updatePrizeRange : filterActions.updateCoinRange
    const maxLimit = isMoney ? 100000 : 10000

    const [blockShown, setBlockShown] = useState(false)
    const [lowerBound, setLowerBound] = useState(activeRange[0])
    const [upperBound, setUpperBound] = useState(activeRange[1])
    const [sliderValue, setSliderValue] = useState([activeRange[0], activeRange[1]])

    // обновление состояния при изменении внешнего состояния
    useEffect(() => {
        setLowerBound(activeRange[0])
        setUpperBound(activeRange[1])
        setSliderValue([activeRange[0], activeRange[1]])
    }, [activeRange])

    const onLowerBoundChange = (e: ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value.slice(0, 6)
        const num = Number(inputValue)
        setLowerBound(num)
        setSliderValue([num, upperBound])
    }

    const onUpperBoundChange = (e: ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value.slice(0, 6)
        const num = Number(inputValue)
        setUpperBound(num)
        setSliderValue([lowerBound, num])
    }

    const onInputBlur = () => {
        setSliderValue([lowerBound, upperBound])
        dispatch(updateRangeAction([lowerBound, upperBound]))
    }

    const updateRange = useCallback(debounce((value: number[]) => {
        dispatch(updateRangeAction(value))
    }, 400), [])

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
                    <ul className={clsx(
                        'filter-block__list',
                        blockShown && 'filter-block__hidden'
                    )}>
                        {filter.items.map(({ name, number, apiKey }) => (
                            <FilterItem
                                key={name}
                                name={name}
                                number={number}
                                filter={filter}
                                apiKey={apiKey}
                            />
                        ))}
                    </ul>
                </>
            )
        }

        if (rangeFilter === 'MONEY' || rangeFilter === 'COINS') {
            return (
                <>
                    <HStack className='justify__between'>
                        <Text Tag='h4' bold className='filter-block__title'>
                            {`${capitalizeStr(rangeFilter)} prize amount`}
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
                    <VStack className={clsx(
                        'filter-range',
                        blockShown && 'filter-block__hidden'
                    )}>
                        <HStack className='justify__between filter-range__block'>
                            <HStack className='align__center'>
                                <Text Tag='span'>From</Text>
                                <Input
                                    name='rangeFrom'
                                    type='number'
                                    value={lowerBound}
                                    step={100}
                                    min={0}
                                    max={upperBound - 100}
                                    onChange={onLowerBoundChange}
                                    onBlur={onInputBlur}
                                    className='filter-range__number'
                                />
                                <Text Tag='span'>{isMoney ? '$' : 'С'}</Text>
                            </HStack>
                            <HStack className='align__center'>
                                <Text Tag='span'>To</Text>
                                <Input
                                    name='rangeTo'
                                    type='number'
                                    value={upperBound}
                                    step={100}
                                    min={lowerBound + 100}
                                    max={maxLimit}
                                    onChange={onUpperBoundChange}
                                    onBlur={onInputBlur}
                                    className='filter-range__number'
                                />
                                <Text Tag='span'>{isMoney ? '$' : 'С'}</Text>
                            </HStack>
                        </HStack>
                        <Slider
                            range
                            allowCross={false}
                            draggableTrack
                            min={0}
                            max={maxLimit}
                            step={100}
                            pushable={100}
                            value={sliderValue}
                            onChange={onSliderChange}
                        />
                    </VStack>
                </>
            )
        }

        return null
    }

    return (
        <VStack className={clsx('filter-wrapper__block', className)}>
            {renderUI()}
        </VStack>
    )
}
